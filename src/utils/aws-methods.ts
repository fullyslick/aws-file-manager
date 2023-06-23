import {
  S3Client,
  S3ClientConfig,
  paginateListObjectsV2,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

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

const getAllS3Files = async () => {
  const totalFiles = [];
  for await (const data of paginateListObjectsV2(
    { client },
    { Bucket: BUCKET }
  )) {
    totalFiles.push(...(data.Contents ?? []));
  }
  return totalFiles;
};

export const getObjects = async () => {
  return getAllS3Files();
};

export const getFolders = () => {};
