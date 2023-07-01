import React from 'react';

import Modal from '../../UI/Modal/Modal';

import { ReactComponent as ErrorSVG } from '../../../assets/error.svg';

import classes from './ErrorDialog.module.css';

type ErrorDialogProps = {
  isShown: boolean;
  toggle: () => void;
  headerText: string;
};

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isShown,
  toggle,
  headerText,
}: ErrorDialogProps) => {
  return (
    <Modal isShown={isShown} hide={toggle} headerText={headerText}>
      <div className={classes['error-dialog']}>
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

export default React.memo(ErrorDialog);
