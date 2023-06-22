import React, { useState } from 'react';

import {
  S3Client,
  S3ClientConfig,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
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

type FormValues = {
  filename: string;
  filebody: string;
};

const config: S3ClientConfig = {
  region: ACCESS_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
};
const client = new S3Client(config);

const FileLoader: React.FC = () => {
  // List all objects in a bucket
  // TODO List objects in a bucket starting with some prefix.
  const [bucketObjects, setBucketObjects] = useState<bucketObject[]>([]);

  const handleObjectList = async () => {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
    });

    // Should try/catch that
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

  // EO: List all objects in a bucket

  // Creating an object with a given name
  const [formValues, setFormValues] = useState<FormValues>({
    filename: '',
    filebody: '',
  });

  const handleInputBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleCreateFolder = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Add empty body and Key: filename = "myfolder/" to create empty folder
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: formValues.filename,
      Body: formValues.filebody,
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // EO: Creating an object with a given name
  return (
    <div>
      <div>
        <form onSubmit={handleCreateFolder}>
          <input type='text' onBlur={handleInputBlur} name='filename' />
          <textarea onBlur={handleInputBlur} name='filebody' />
          <button type='submit'>Upload File</button>
        </form>
      </div>
      <div>
        Results:
        <button onClick={handleObjectList}>List Objects</button>
        <div>
          {bucketObjects.map((item) => (
            <li key={item.key}>{item.key}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileLoader;
