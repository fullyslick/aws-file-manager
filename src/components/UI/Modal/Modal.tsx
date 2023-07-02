import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import FocusLock from 'react-focus-lock';

import { ReactComponent as CloseSVG } from '../../../assets/close.svg';

import styles from './Modal.module.css';

export interface ModalProps {
  color?: 'White' | 'Blue';
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
      <div className={styles.modalBackdrop} onClick={hide}></div>
      <FocusLock>
        <div
          className={styles.modalWrapper}
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role='dialog'
        >
          <div className={`${styles.modal} ${styles['modal' + color]}`}>
            <div className={styles.modalHeader}>
              <span>{headerText}</span>
              <button
                className={styles.modalHeaderCloseButton}
                type='button'
                onClick={hide}
              >
                <CloseSVG />
              </button>
            </div>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      </FocusLock>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
