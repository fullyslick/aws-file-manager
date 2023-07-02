import React, { useContext, useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { ConfigContext } from '../../../contexts/ConfigContext';
import { WorkingDirContext } from '../../../contexts/WorkingDirContext';

import useInput from '../../../hooks/useInput';
import { createS3Object } from '../../../services/aws-methods';
import { requiredFiled } from '../../../utils/validators';

import { ReactComponent as ErrorSVG } from '../../../assets/error.svg';

import classes from './CreateFolderDialog.module.css';

type CreateFolderDialogProps = {
  isShown: boolean;
  toggle: () => void;
};

const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  isShown,
  toggle,
}: CreateFolderDialogProps) => {
  const { configData } = useContext(ConfigContext);
  const { workingDir, setLastModified } = useContext(WorkingDirContext);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { value, error, handleValueChange, validateInput } =
    useInput(requiredFiled);

  const handleCreateFolder = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateInput()) {
      return;
    }
    setIsLoading(true);

    try {
      await createS3Object(configData, workingDir + value + '/');
      setLastModified(new Date().toISOString());
      toggle();
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const regex = /^[0-9a-zA-Z\-_]+$/;

    const inputValue = event.target.value;

    if (inputValue && !regex.test(inputValue)) {
      return;
    }

    handleValueChange(event);
  };

  return (
    <Modal
      isShown={isShown}
      hide={toggle}
      headerText={'Create folder'}
      color='blue'
    >
      <>
        {hasError ? (
          <div className={classes['create-folder-dialog__error']}>
            <ErrorSVG />
            <p>
              Something went wrong!
              <br />
              Please try again later.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateFolder} id='createFolderForm'>
            <Input
              type='text'
              label='Folder name'
              name='folder-name'
              error={error}
              onChange={normalizeInput}
              value={value}
            />
            <Button
              isLoading={isLoading}
              type='submit'
              className={classes['create-folder-dialog__submit']}
            >
              Create Folder
            </Button>
          </form>
        )}
      </>
    </Modal>
  );
};

export default React.memo(CreateFolderDialog);
