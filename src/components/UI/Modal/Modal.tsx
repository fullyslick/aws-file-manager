import React, { useCallback, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  headerText: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isShown,
  hide,
  headerText,
  children,
}) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27 && isShown) {
        hide();
      }
    },
    [hide, isShown]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [isShown, onKeyDown]);

  const modal = (
    <React.Fragment>
      <div className={classes['modal__backdrop']} onClick={hide}></div>
      <FocusLock>
        <div
          className={classes['modal-wrapper']}
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role='dialog'
        >
          <div className={classes.modal}>
            <div className={classes['modal__header']}>
              <button
                className={classes['modal__header-close-button']}
                type='button'
                onClick={hide}
              >
                X
              </button>
            </div>
            <div className={classes['modal__content']}>{children}</div>
          </div>
        </div>
      </FocusLock>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
