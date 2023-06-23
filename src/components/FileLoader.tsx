import React, { useState } from 'react';

import {
  S3Client,
  S3ClientConfig,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

const ACCESS_KEY_ID: string = process.env.REACT_APP_ACCESS_KEY_ID || '';
const SECRET_ACCESS_KEY: string = process.env.REACT_APP_SECRET_ACCESS_KEY || '';
const ACCESS_REGION: string = process.env.REACT_APP_REGION || '';
const BUCKET: string = process.env.REACT_APP_BUCKET || '';

// Custom interfaces
interface IBucketObject {
  Key: string;
  lastModified: string;
}

class BucketObject implements IBucketObject {
  public constructor(public Key: string, public lastModified: string) {}
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
  const [bucketObjects, setBucketObjects] = useState<IBucketObject[]>([]);

  const handleObjectList = async (token: string | undefined = undefined) => {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      ContinuationToken: token,
    });

    try {
      const response: ListObjectsV2CommandOutput = await client.send(command);

      if (response.Contents) {
        const awsBucketObjects: IBucketObject[] = response.Contents.map(
          (item) => {
            return new BucketObject(
              item.Key!,
              item.LastModified?.toISOString()!
            );
          }
        );

        // This handles adding next 1000 objects
        if (token) {
          setBucketObjects((prevState) => [...prevState, ...awsBucketObjects]);
        } else {
          setBucketObjects(awsBucketObjects);
        }

        if (response.NextContinuationToken) {
          // Recursive call to next 1000, it is async task so it should not block js
          handleObjectList(response.NextContinuationToken);
        }
        return;
      }

      // No objects in the bucket so reset the state if it was not empty
      if (bucketObjects.length) {
        setBucketObjects([]);
      }
    } catch (error) {
      // Should notify UI about failure
      console.log(error);
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

  const handleCreateObject = async (
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
      // Should notify UI about failure
      console.error(err);
    }
  };
  // EO: Creating an object with a given name

  // Deleting objects
  const handleObjectDelete = async (deletedObject: IBucketObject) => {
    // recursive delete
    const isFolder = deletedObject?.Key?.endsWith('/');

    let deletedObjects: IBucketObject[] | [] = [];

    if (isFolder) {
      deletedObjects = bucketObjects.filter((bucketObject) =>
        bucketObject?.Key?.startsWith(deletedObject?.Key!)
      );
    } else {
      deletedObjects = [deletedObject];
    }

    console.log(deletedObjects);

    const command = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: deletedObjects,
      },
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      // Should notify UI about failure
      console.error(err);
    }
  };
  // EO: Deleting objects

  return (
    <div>
      <div>
        <form onSubmit={handleCreateObject}>
          <input type='text' onBlur={handleInputBlur} name='filename' />
          <textarea onBlur={handleInputBlur} name='filebody' />
          <button type='submit'>Upload File</button>
        </form>
      </div>
      <div>
        Results:
        <button onClick={() => handleObjectList()}>List Objects</button>
        <div>
          {bucketObjects.map((item) => (
            <li key={item.Key}>
              <span>{item.Key}</span>
              <button onClick={() => handleObjectDelete(item)}>Delete</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileLoader;
