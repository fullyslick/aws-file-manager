import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import FocusLock from 'react-focus-lock';

import { ReactComponent as CloseSVG } from '../../../assets/close.svg';

import classes from './Modal.module.css';

export interface ModalProps {
  color?: 'white' | 'blue';
  isShown: boolean;
  hide: () => void;
  headerText: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  color = 'white',
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
          <div className={`${classes.modal} ${classes['modal--' + color]}`}>
            <div className={classes['modal__header']}>
              <span>{headerText}</span>
              <button
                className={classes['modal__header-close-button']}
                type='button'
                onClick={hide}
              >
                <CloseSVG />
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
