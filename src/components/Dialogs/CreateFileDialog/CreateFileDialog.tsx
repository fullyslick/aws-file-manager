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

import styles from './CreateFileDialog.module.css';
import TextArea from '../../UI/TextArea/TextArea';

type CreateFileDialogProps = {
  isShown: boolean;
  toggle: () => void;
};

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({
  isShown,
  toggle,
}: CreateFileDialogProps) => {
  const { configData } = useContext(ConfigContext);

  const { workingDir, setLastModified } = useContext(WorkingDirContext);

  const [hasError, setHasError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: inputValue,
    error: inputError,
    handleValueChange: handleInputValueChange,
    validateInput,
  } = useInput(requiredFiled);

  const {
    value: textAreaValue,
    error: textAreaError,
    handleValueChange: handleTextAreaChange,
    validateInput: validateTextArea,
  } = useInput(requiredFiled);

  const handleCreateFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidInput = validateInput();
    const isValidTextArea = validateTextArea();
    const isFormValid = isValidInput && isValidTextArea;

    if (!isFormValid) {
      return;
    }
    setIsLoading(true);

    try {
      await createS3Object(
        configData,
        workingDir + inputValue + '.txt',
        textAreaValue
      );
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

    handleInputValueChange(event);
  };

  return (
    <Modal
      isShown={isShown}
      hide={toggle}
      headerText={'Create file'}
      color='Blue'
    >
      <>
        {hasError ? (
          <div className={styles.createFileDialogError}>
            <ErrorSVG />
            <p>
              Something went wrong!
              <br />
              Please try again later.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateFile} id='createFileForm'>
            <Input
              type='text'
              label='File name'
              name='file-name'
              error={inputError}
              onChange={normalizeInput}
              value={inputValue}
            />
            <TextArea
              label='Content'
              name='content'
              error={textAreaError}
              onChange={handleTextAreaChange}
              value={textAreaValue}
            />
            <Button
              isLoading={isLoading}
              type='submit'
              className={styles.createFileDialogSubmit}
            >
              Create File
            </Button>
          </form>
        )}
      </>
    </Modal>
  );
};

export default React.memo(CreateFileDialog);
