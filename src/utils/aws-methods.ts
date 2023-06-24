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

const getS3Objects = async (prefix: string) => {
  const fileObjects = [];
  const folderObjects = [];
  for await (const data of paginateListObjectsV2(
    { client },
    { Bucket: BUCKET, Delimiter: '/', Prefix: prefix !== '/' ? prefix : '' }
  )) {
    fileObjects.push(...(data.Contents ?? []));
    folderObjects.push(...(data.CommonPrefixes ?? []));
  }

  const folders = folderObjects.map(
    (folderObj) =>
      new ObjectData(
        // To extract folder name from Prefix, you need remove the current prefix/folder from the string
        // However on root level that is not required - !prefix = root
        !prefix ? folderObj.Prefix! : folderObj.Prefix!.split(prefix)[1],
        folderObj.Prefix!
      )
  );

  let files = fileObjects.map(
    (fileObj) =>
      new ObjectData(
        // To extract file name from Prefix, you need remove the current prefix/folder from the string
        // However on root level that is not required - !prefix = root
        !prefix ? fileObj.Key! : fileObj.Key!.split(prefix)[1],
        fileObj.Key!
      )
  );

  // In some cases current dir is added as first element in files array
  // In such cases remove the first element
  files = files[0].location === prefix ? files.slice(1) : files;

  return new FolderView(folders, files);
};

export const getObjects = async (prefix: string = '') => {
  return getS3Objects(prefix);
};
