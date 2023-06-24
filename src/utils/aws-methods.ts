import {
  S3Client,
  S3ClientConfig,
  paginateListObjectsV2,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

import {
  ObjectDataInterface,
  ObjectData,
  FolderView,
  FolderViewInterface,
} from '../types/folder-view.types';

import { FolderTree, FolderNode } from '../types/folder-tree.types';

const ACCESS_KEY_ID: string = process.env.REACT_APP_ACCESS_KEY_ID || '';
const SECRET_ACCESS_KEY: string = process.env.REACT_APP_SECRET_ACCESS_KEY || '';
const ACCESS_REGION: string = process.env.REACT_APP_REGION || '';
const BUCKET: string = process.env.REACT_APP_BUCKET || '';

const config: S3ClientConfig = {
  region: ACCESS_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
};

const client = new S3Client(config);

const getS3Objects = async (prefix: string, delimiter: string = '/') => {
  const fileObjects = [];
  const folderObjects = [];
  for await (const data of paginateListObjectsV2(
    { client },
    {
      Bucket: BUCKET,
      Delimiter: delimiter,
      Prefix: prefix !== '/' ? prefix : '',
    }
  )) {
    fileObjects.push(...(data.Contents ?? []));
    folderObjects.push(...(data.CommonPrefixes ?? []));
  }

  if (!fileObjects.length && !folderObjects.length) {
    throw new Error('No data was found');
  }

  let folders: ObjectData[] | [] = [];

  if (folderObjects.length) {
    folders = folderObjects.map(
      (folderObj) =>
        new ObjectData(
          // To extract folder name from Prefix, you need remove the current prefix/folder from the string
          // However on root level that is not required - !prefix = root
          !prefix
            ? folderObj.Prefix!
            : folderObj.Prefix!.split('/').slice(-2)[0],
          folderObj.Prefix!
        )
    );
  }

  let files: ObjectData[] | [] = [];

  if (fileObjects.length) {
    files = fileObjects.map(
      (fileObj) =>
        new ObjectData(
          // To extract file name from Prefix, you need remove the current prefix/folder from the string
          // However on root level that is not required - !prefix = root
          !prefix ? fileObj.Key! : fileObj.Key!.split('/').splice(-1)[0],
          fileObj.Key!
        )
    );

    // In some cases current dir is added as first element in files array
    // In such cases remove the first element
    files = files[0].location === prefix ? files.slice(1) : files;
  }

  return new FolderView(folders, files);
};

export const getObjects = async (prefix: string = '') => {
  return getS3Objects(prefix);
};

export const getFolderTree = async () => {
  const s3Objects = await getS3Objects('/', '');

  const { files: s3ObjectContent } = s3Objects;

  // Extracts folders objects as array of strings: ['prefix/', 'prefix/subprefix', 'prefix/subprefix/subsubprefix']
  const foldersPaths = s3ObjectContent
    .filter((s3Obj) => s3Obj.location.endsWith('/'))
    .map((s3Obj) => s3Obj.location);

  // Aggregates folder structure
  let folderTree: FolderTree = [];
  let level: any = { folderTree: folderTree };

  // Iterate over each folderPath string
  foldersPaths.forEach((path) => {
    // Split the folderPath string into individual segments
    // For every segment create a folderNode
    path.split('/').reduce((accumulator, currentFolderSegment) => {
      if (!accumulator[currentFolderSegment]) {
        accumulator[currentFolderSegment] = { folderTree: [] };

        if (currentFolderSegment) {
          accumulator.folderTree.push(
            new FolderNode(
              currentFolderSegment,
              path,
              accumulator[currentFolderSegment].folderTree
            )
          );
        }
      }

      return accumulator[currentFolderSegment];
    }, level);
  });

  return Promise.resolve(folderTree);
};
