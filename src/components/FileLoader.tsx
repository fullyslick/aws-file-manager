import React, { useState, useRef } from 'react';

import { getFolderTree, getObjects } from '../utils/aws-methods';
import { ObjectData, ObjectDataInterface } from '../types/folder-view.types';

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
  const [filesState, setFilesState] = useState<ObjectData[]>([]);
  const [foldersState, setFoldersState] = useState<ObjectData[]>([]);

  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleObjectList = async () => {
    try {
      const { files, folders } = await getObjects(
        folderInputRef.current?.value
      );

      if (files.length) {
        setFilesState(files);
      } else {
        setFilesState([]);
      }

      if (folders.length) {
        setFoldersState(folders);
      } else {
        setFoldersState([]);
      }
    } catch (error) {
      // Should notify UI
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
      handleObjectList();
    } catch (err) {
      // Should notify UI about failure
      console.error(err);
    }
  };
  // EO: Creating an object with a given name

  const [checkedObjects, setCheckedObjects] = useState<string[] | []>([]);

  // Deleting objects
  const handleObjectDelete = async (deletedObjectsKeys: string[]) => {
    let subFolders: string[] = [];
    let nextObjects: string[] = [];

    deletedObjectsKeys.forEach((delObj) => {
      if (delObj.endsWith('/')) {
        // Find all items in the folder
        const result = bucketObjects
          .filter((item) => item.Key.startsWith(delObj))
          .map((item) => item.Key);
        if (result.length) {
          subFolders = [...subFolders, ...result];
        }
      }
    });

    deletedObjectsKeys = subFolders.length ? subFolders : deletedObjectsKeys;

    let deletedObjects: { Key: string }[] = deletedObjectsKeys.map((item) => {
      return {
        Key: item,
      };
    });

    if (deletedObjectsKeys.length >= 1000) {
      nextObjects = deletedObjectsKeys.filter((delObj, index) => index >= 1000);
      deletedObjects = deletedObjects.filter((delObj, index) => index < 1000);
    }

    const command = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: deletedObjects,
      },
    });

    try {
      const response = await client.send(command);

      if (nextObjects.length) {
        handleObjectDelete(nextObjects);
        return;
      }
      handleObjectList();
    } catch (err) {
      // Should notify UI about failure
      console.error(err);
    }
  };
  // EO: Deleting objects
  const handleCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedItemKey: string =
      event.currentTarget.getAttribute('data-item-key')!;

    if (event.currentTarget.checked) {
      setCheckedObjects((prevState) => [...prevState, checkedItemKey]);
    } else {
      setCheckedObjects((prevState) =>
        prevState.filter((item) => item !== checkedItemKey)
      );
    }
  };

  const handleDeleteSelected = () => {
    handleObjectDelete(checkedObjects);
    setCheckedObjects([]);
  };

  const handleGetFolderTree = async () => {
    try {
      const fileTree = await getFolderTree();

      console.log(fileTree);
    } catch (error) {
      // Should notify UI about failure
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleCreateObject}>
          <input type='text' onBlur={handleInputBlur} name='filename' />
          <textarea onBlur={handleInputBlur} name='filebody' />
          <button type='submit'>Upload File</button>
        </form>
      </div>
      <p>
        <button onClick={handleDeleteSelected}>Delete Selected</button>
      </p>
      <div>
        <button onClick={handleGetFolderTree}>Get Folder Tree</button>
      </div>
      <div>
        <input type='text' ref={folderInputRef} />
        <button onClick={() => handleObjectList()}>List Objects</button>

        {foldersState.length !== 0 && (
          <div>
            <h2>Folders</h2>
            {foldersState.map((folder) => (
              <li key={folder.location}>
                <input
                  type='checkbox'
                  onChange={handleCheckboxCheck}
                  data-item-key={folder.location}
                />
                <span>{folder.name}</span>
                <button onClick={() => handleObjectDelete([folder.location])}>
                  Delete
                </button>
              </li>
            ))}
          </div>
        )}

        {filesState.length !== 0 && (
          <div>
            <h2>Files</h2>
            {filesState.map((file) => (
              <li key={file.location}>
                <input
                  type='checkbox'
                  onChange={handleCheckboxCheck}
                  data-item-key={file.location}
                />
                <span>{file.name}</span>
                <button onClick={() => handleObjectDelete([file.location])}>
                  Delete
                </button>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileLoader;
