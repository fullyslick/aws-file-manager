import React from 'react';

import Modal from '../../UI/Modal/Modal';

import { ReactComponent as ErrorSVG } from '../../../assets/error.svg';

import classes from './DeleteSelectedDialog.module.css';

type DeleteSelectedDialogProps = {
  isShown: boolean;
  toggle: () => void;
};

const DeleteSelectedDialog: React.FC<DeleteSelectedDialogProps> = ({
  isShown,
  toggle,
}: DeleteSelectedDialogProps) => {
  return (
    <Modal
      isShown={isShown}
      hide={toggle}
      headerText={'Unable to delete files'}
    >
      <div className={classes['delete-selected-dialog__error']}>
        <ErrorSVG />
        <p>
          Something went wrong!
          <br />
          Please try again later.
        </p>
      </div>
    </Modal>
  );
};

export default React.memo(DeleteSelectedDialog);
