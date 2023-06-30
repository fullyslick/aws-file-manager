import React, { useEffect, useContext, useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import Loader from '../../UI/Loader/Loader';

import { ConfigContext } from '../../../contexts/ConfigContext';

import { getObjectContent } from '../../../services/aws-methods';

import classes from './ReadFileDialog.module.css';

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
  }, [isShown, filePath]);

  return (
    <Modal isShown={isShown} hide={toggle} headerText={filePath}>
      <div className={classes['read-file-dialog']}>
        {isLoading && <Loader />}
        {fileContent && <p>{fileContent}</p>}
        {hasError && <p>Error !</p>}
      </div>
    </Modal>
  );
};

export default React.memo(ReadFileDialog);
