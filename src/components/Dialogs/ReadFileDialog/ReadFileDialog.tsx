import React, { useEffect, useContext, useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import Loader from '../../UI/Loader/Loader';

import { ConfigContext } from '../../../contexts/ConfigContext';

import { getObjectContent } from '../../../services/aws-methods';

import { ReactComponent as ErrorSVG } from '../../../assets/error.svg';

import styles from './ReadFileDialog.module.css';

type ReadFileDialogProps = {
  isShown: boolean;
  toggle: () => void;
  filePath: string;
};

const ReadFileDialog: React.FC<ReadFileDialogProps> = ({
  isShown,
  toggle,
  filePath,
}: ReadFileDialogProps) => {
  const { configData } = useContext(ConfigContext);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    if (!isShown) {
      return;
    }

    const readFileContent = async () => {
      setIsLoading(true);
      try {
        const fileContent = await getObjectContent(configData, filePath);

        setFileContent(fileContent);
      } catch (error) {
        setHasError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    readFileContent();
  }, [isShown, filePath, configData]);

  return (
    <Modal isShown={isShown} hide={toggle} headerText={filePath}>
      <>
        {isLoading && <Loader color='black' />}
        {fileContent && (
          <p className={styles.readFileDialogContent}>{fileContent}</p>
        )}
        {hasError && (
          <div className={styles.readFileDialogError}>
            <ErrorSVG />
            <p>
              Something went wrong!
              <br />
              Please try again later.
            </p>
          </div>
        )}
      </>
    </Modal>
  );
};

export default React.memo(ReadFileDialog);
