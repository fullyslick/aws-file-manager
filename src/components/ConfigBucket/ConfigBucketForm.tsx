import React, { useRef, useContext, useState } from 'react';

import { ConfigContext } from '../../contexts/ConfigContext';
import Button from '../UI/Button/Button';
import classes from './ConfigBucketForm.module.css';

const ConfigBucketForm: React.FC = () => {
  const { setConfig } = useContext(ConfigContext);
  const [formSubmissionError, setFormSubmissionError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO should rework with state/controlled
  const accessKeyRef = useRef<HTMLInputElement>(null);
  const secretKeyRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const bucketRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO should rework with state/controlled
    const accessKeyValue = accessKeyRef.current?.value;
    const secretKeyValue = secretKeyRef.current?.value;
    const regionValue = regionRef.current?.value;
    const bucketValue = bucketRef.current?.value;

    // TODO should validate

    // Clear previous errors
    if (formSubmissionError.length) {
      setFormSubmissionError('');
    }

    setIsLoading(true);
    try {
      await setConfig({
        accessKeyId: accessKeyValue,
        secretAccessKey: secretKeyValue,
        region: regionValue,
        bucket: bucketValue,
      });
    } catch (error) {
      console.log(error);
      setFormSubmissionError(
        'Unable to fetch data! Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes['config-bucket-form']} onSubmit={handleSubmit}>
      <label htmlFor='access-id'>Access Key Id</label>
      <input
        type='text'
        placeholder='Access ID'
        id='access-id'
        ref={accessKeyRef}
      />
      <p className='validation-error'></p>
      <label htmlFor='secret-access-key'>Secret Access Key</label>
      <input
        className=''
        type='text'
        placeholder='Secret Access Key'
        ref={secretKeyRef}
        id='secret-access-key'
      />
      <p className='validation-error'></p>
      <label htmlFor='region'>Region</label>
      <input type='text' placeholder='Region' id='region' ref={regionRef} />
      <p className='validation-error'></p>
      <label htmlFor='bucket'>Bucket</label>
      <input type='text' placeholder='Bucket' id='bucket' ref={bucketRef} />
      <p className='validation-error'></p>
      <p className='validation-error'>{formSubmissionError}</p>
      <Button type='submit' isLoading={isLoading} disabled={isLoading}>
        Load Bucket
      </Button>
    </form>
  );
};

export default ConfigBucketForm;
