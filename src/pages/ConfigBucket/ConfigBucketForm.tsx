import React, { useContext, useState } from 'react';

import { ConfigContext } from '../../contexts/ConfigContext';
import { getS3Objects } from '../../services/aws-methods';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import useInput from '../../hooks/useInput';
import { requiredFiled } from '../../utils/validators';

import styles from './ConfigBucketForm.module.css';

const ConfigBucketForm: React.FC = () => {
  const { setConfig } = useContext(ConfigContext);
  const [formSubmissionError, setFormSubmissionError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: accessKeyValue,
    error: accessKeyError,
    handleValueChange: handleAccessKeyChange,
    validateInput: validateAccessKey,
  } = useInput(requiredFiled);

  const {
    value: secretKeyValue,
    error: secretKeyError,
    handleValueChange: handleSecretKeyChange,
    validateInput: validateSecretKey,
  } = useInput(requiredFiled);

  const {
    value: regionValue,
    error: regionError,
    handleValueChange: handleRegionChange,
    validateInput: validateRegion,
  } = useInput(requiredFiled);

  const {
    value: bucketValue,
    error: bucketError,
    handleValueChange: handleBucketChange,
    validateInput: validateBucket,
  } = useInput(requiredFiled);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidAccessKey = validateAccessKey();
    const isValidSecretKey = validateSecretKey();
    const isValidRegion = validateRegion();
    const isValidBucket = validateBucket();
    const isFormValid =
      isValidAccessKey && isValidSecretKey && isValidRegion && isValidBucket;

    if (!isFormValid) {
      return;
    }

    const credentials = {
      accessKeyId: accessKeyValue,
      secretAccessKey: secretKeyValue,
      region: regionValue,
      bucket: bucketValue,
    };

    // Clear previous submission errors
    if (formSubmissionError.length) {
      setFormSubmissionError('');
    }

    // Display loader on button
    setIsLoading(true);

    try {
      // Throws error if credentials are incorrect
      await getS3Objects(credentials, '');
      // Store credentials
      setConfig(credentials);
    } catch (error) {
      setFormSubmissionError(
        'Unable to fetch data! Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit} id='configForm'>
      <Input
        label='Access Key Id*'
        name='access-id'
        type='text'
        value={accessKeyValue}
        onChange={handleAccessKeyChange}
        error={accessKeyError}
      />
      <Input
        label='Secret Access Key*'
        name='secret-access-key'
        type='text'
        value={secretKeyValue}
        onChange={handleSecretKeyChange}
        error={secretKeyError}
      />
      <Input
        label='Region*'
        name='region'
        type='text'
        value={regionValue}
        onChange={handleRegionChange}
        error={regionError}
      />
      <Input
        label='Bucket*'
        name='bucket'
        type='text'
        value={bucketValue}
        onChange={handleBucketChange}
        error={bucketError}
      />
      <p className={styles['form-submit-error']}>{formSubmissionError}</p>
      <Button
        type='submit'
        isLoading={isLoading}
        disabled={isLoading}
        className={styles['form-submit-btn']}
      >
        Load Bucket
      </Button>
    </form>
  );
};

export default ConfigBucketForm;
