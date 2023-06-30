import React, { useEffect } from 'react';

import Modal from '../../UI/Modal/Modal';

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
  useEffect(() => {
    if (!isShown) {
      return;
    }

    console.log('Fetching data for: ' + filePath);
  }, [isShown, filePath]);

  return (
    <Modal isShown={isShown} hide={toggle} headerText={filePath}>
      <div className={classes['read-file-dialog']}>
        <p>File Content</p>
      </div>
    </Modal>
  );
};

export default React.memo(ReadFileDialog);
