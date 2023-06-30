import {
  S3Client,
  S3ClientConfig,
  paginateListObjectsV2,
  PutObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandOutput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { BrowserNode } from '../types/browser.types';

import { FolderTreeInterface, FolderNode } from '../types/folder-tree.types';
import { ConfigCredentialsInterface } from '../types/config-context.types';

// TODO remove
const BUCKET: string = process.env.REACT_APP_BUCKET || '';

const setS3Client = (credentials: ConfigCredentialsInterface) => {
  const { region, accessKeyId, secretAccessKey } = credentials;

  const config: S3ClientConfig = {
    region: region,
    credentials: {
      accessKeyId: accessKeyId || '',
      secretAccessKey: secretAccessKey || '',
    },
  };

  return new S3Client(config);
};

export const getS3Objects = async (
  credentials: ConfigCredentialsInterface,
  prefix: string,
  delimiter: string = '/'
) => {
  const fileObjects = [];
  const folderObjects = [];

  const client = setS3Client(credentials);

  for await (const data of paginateListObjectsV2(
    { client },
    {
      Bucket: credentials.bucket,
      Delimiter: delimiter,
      Prefix: prefix !== '/' ? prefix : '',
    }
  )) {
    fileObjects.push(...(data.Contents ?? []));
    folderObjects.push(...(data.CommonPrefixes ?? []));
  }

  if (!fileObjects.length && !folderObjects.length) {
    return [];
  }

  let folders: BrowserNode[] | [] = [];

  if (folderObjects.length) {
    folders = folderObjects.map(
      (folderObj) =>
        new BrowserNode(
          // To extract folder name from Prefix, you need remove the current prefix/folder from the string
          // However on root level that is not required - !prefix = root
          !prefix
            ? folderObj.Prefix!.split('/')[0]
            : folderObj.Prefix!.split('/').slice(-2)[0],
          folderObj.Prefix!,
          true
        )
    );
  }

  let files: BrowserNode[] | [] = [];

  if (fileObjects.length) {
    files = fileObjects.map(
      (fileObj) =>
        new BrowserNode(
          // To extract file name from Key, you need remove the current prefix/folder from the string
          // However on root level that is not required - !prefix = root
          !prefix ? fileObj.Key! : fileObj.Key!.split('/').splice(-1)[0],
          fileObj.Key!,
          false
        )
    );

    // In some cases current dir is added as first element in files array
    // In such cases remove the first element
    files = files[0].path === prefix ? files.slice(1) : files;
  }

  return [...folders, ...files];
};

export const getFolderTree = async (
  credentials: ConfigCredentialsInterface
) => {
  const s3Objects = await getS3Objects(credentials, '/', '');

  // Extracts folders objects as array of strings: ['prefix/', 'prefix/subprefix', 'prefix/subprefix/subsubprefix']
  const foldersPaths = s3Objects
    .filter((s3Obj) => s3Obj.path.endsWith('/'))
    .map((s3Obj) => s3Obj.path);

  // Aggregates folder structure
  let FolderTreeInterface: FolderTreeInterface = [];
  let level: any = { FolderTreeInterface: FolderTreeInterface };

  // Iterate over each folderPath string
  foldersPaths.forEach((path) => {
    // Split the folderPath string into individual segments
    // For every segment create a folderNode
    path.split('/').reduce((accumulator, currentFolderSegment) => {
      if (!accumulator[currentFolderSegment]) {
        accumulator[currentFolderSegment] = { FolderTreeInterface: [] };

        if (currentFolderSegment) {
          accumulator.FolderTreeInterface.push(
            new FolderNode(
              currentFolderSegment,
              path,
              accumulator[currentFolderSegment].FolderTreeInterface
            )
          );
        }
      }

      return accumulator[currentFolderSegment];
    }, level);
  });

  return Promise.resolve(FolderTreeInterface);
};

export const createS3Object = async (
  credentials: ConfigCredentialsInterface,
  objectName: string,
  objectContent?: string
) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: objectName,
    Body: objectContent,
  });

  const { region, accessKeyId, secretAccessKey } = credentials;

  const client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKeyId || '',
      secretAccessKey: secretAccessKey || '',
    },
  });

  try {
    const response = await client.send(command);

    return Promise.resolve(response);
  } catch (err) {
    // Should notify UI about failure
    return Promise.reject(err);
  }
};

export const deleteS3Objects = async (
  credentials: ConfigCredentialsInterface,
  selectedObjectsKeys: string[]
) => {
  let nextObjects: string[] = [];
  let operationResponse: DeleteObjectsCommandOutput;

  const { region, accessKeyId, secretAccessKey } = credentials;

  const client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKeyId || '',
      secretAccessKey: secretAccessKey || '',
    },
  });

  const recursiveDelete = async (deletedObjectsKeys: string[]) => {
    let allDeletedObjects = [];

    try {
      if (nextObjects.length) {
        allDeletedObjects = deletedObjectsKeys;
      } else {
        const deletedObjectsContent = await Promise.all(
          deletedObjectsKeys.map((deletedObjectKey) =>
            getS3Objects(credentials, deletedObjectKey, '')
          )
        );

        const deletedObjectsContentFlattened = deletedObjectsContent
          .map((deletedObjectContent) => {
            if (deletedObjectContent.length) {
              return deletedObjectContent.map((item) => item?.path);
            }
            return [];
          })
          .reduce((acc, subArray) => acc?.concat(subArray), []);

        allDeletedObjects = [
          ...deletedObjectsContentFlattened,
          ...deletedObjectsKeys,
        ];
      }

      if (allDeletedObjects.length >= 1000) {
        nextObjects = allDeletedObjects.filter(
          (delObj, index) => index >= 1000
        );
        allDeletedObjects = allDeletedObjects.filter(
          (delObj, index) => index < 1000
        );
      } else {
        // reset nextObjects to set bottom of recursion
        nextObjects = [];
      }

      const allDeletedObjectsKeys = allDeletedObjects.map((item) => {
        return {
          Key: item,
        };
      });

      const command = new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: {
          Objects: allDeletedObjectsKeys,
        },
      });

      const response = await client.send(command);

      if (nextObjects.length) {
        await recursiveDelete(nextObjects);
      } else {
        operationResponse = response;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  await recursiveDelete(selectedObjectsKeys);

  return Promise.resolve(operationResponse!);
};

export const getObjectContent = async (
  credentials: ConfigCredentialsInterface,
  objectKey: string
) => {
  const command = new GetObjectCommand({
    Bucket: credentials.bucket,
    Key: objectKey,
  });

  const client = setS3Client(credentials);

  try {
    const response = await client.send(command);

    if (response.Body) {
      const objectContent = await response.Body.transformToString();

      return Promise.resolve(objectContent);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
