import React, { useState } from 'react';

import {
  S3Client,
  ListObjectsV2Command,
  S3ClientConfig,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';

const ACCESS_KEY_ID: string = process.env.REACT_APP_ACCESS_KEY_ID || '';
const SECRET_ACCESS_KEY: string = process.env.REACT_APP_SECRET_ACCESS_KEY || '';
const ACCESS_REGION: string = process.env.REACT_APP_REGION || '';
const BUCKET: string = process.env.REACT_APP_BUCKET || '';

// Custom interfaces
interface bucketObject {
  key: string | undefined;
  lastModified: string | undefined;
}

const config: S3ClientConfig = {
  region: ACCESS_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
};
const client = new S3Client(config);

const FileLoader: React.FC = () => {
  // List Objects
  const [bucketObjects, setBucketObjects] = useState<bucketObject[]>([]);

  const handleObjectList = async () => {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
    });

    const response: ListObjectsV2CommandOutput = await client.send(command);

    if (response.Contents) {
      const awsBucketObjects: bucketObject[] = response.Contents.map((item) => {
        return {
          key: item.Key,
          lastModified: item.LastModified?.toISOString(),
        };
      });

      setBucketObjects(awsBucketObjects);
    }
  };

  // EO: List Objects

  return (
    <div>
      Results:
      <button onClick={handleObjectList}>List Objects</button>
      <div>
        {bucketObjects.map((item) => (
          <li key={item.key}>{item.key}</li>
        ))}
      </div>
    </div>
  );
};

export default FileLoader;
