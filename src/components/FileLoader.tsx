import React, { useState, useRef } from 'react';

import {
  createS3Object,
  deleteS3Objects,
  getObjectContent,
} from '../services/aws-methods';
import { BrowserNodesInterface } from '../types/browser.types';

import {
  S3Client,
  S3ClientConfig,
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

  const [browserNodes, setBrowserNodes] = useState<BrowserNodesInterface>([]);

  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleObjectList = async () => {
    // try {
    //   const s3Objects = await getObjects(folderInputRef.current?.value);
    //   if (s3Objects.length) {
    //     setBrowserNodes(s3Objects);
    //   } else {
    //     setBrowserNodes([]);
    //     throw new Error('There is no data found!');
    //   }
    // } catch (error) {
    //   // Should notify UI
    //   console.log(error);
    // }
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

    // try {
    //   const response = await createS3Object(
    //     formValues.filename,
    //     formValues.filebody
    //   );

    //   if (response?.$metadata.httpStatusCode === 200) {
    //     console.log(response?.$metadata.httpStatusCode);
    //     handleObjectList();
    //   }
    // } catch (err) {
    //   // Should notify UI about failure
    //   console.log(err);
    // }
  };
  // EO: Creating an object with a given name

  const [checkedObjects, setCheckedObjects] = useState<string[] | []>([]);

  // Deleting objects
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

  const handleDeleteSelected = async () => {
    // try {
    //   const response = await deleteS3Objects(checkedObjects);
    //   if (response?.Deleted?.length) {
    //     console.log(response?.Deleted?.length);
    //     await handleObjectList();
    //     setCheckedObjects([]);
    //   }
    // } catch (error) {
    //   // Inform UI
    //   console.log(error);
    // }
  };
  // EO: Deleting objects

  // Read file
  const readFileInputRef = useRef<HTMLInputElement>(null);
  const [fileContent, setFileContent] = useState<string>();

  const handleReadFile = async () => {
    const fileInput = readFileInputRef.current!.value;

    // try {
    //   const objectContent = await getObjectContent(fileInput);
    //   setFileContent(objectContent);
    // } catch (error) {
    //   // Inform UI
    //   console.log(error);
    // }
  };
  // EO: Read file

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
        <input type='text' ref={readFileInputRef} />
        <button onClick={handleReadFile}>Read File</button>
        {fileContent && <p>{fileContent}</p>}
      </div>
      <div>
        <input type='text' ref={folderInputRef} />
        <button onClick={handleObjectList}>List Objects</button>
        <p>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </p>
        {browserNodes.length !== 0 && (
          <div>
            <h2>S3 Objects</h2>
            {browserNodes.map((browserNode) => (
              <li key={browserNode.path}>
                <input
                  type='checkbox'
                  onChange={handleCheckboxCheck}
                  data-item-key={browserNode.path}
                />
                <span
                  style={{ color: browserNode.isFolder ? 'blue' : 'black' }}
                >
                  {browserNode.name}
                </span>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileLoader;
