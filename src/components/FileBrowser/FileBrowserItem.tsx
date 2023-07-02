import React from 'react';

import useModal from '../../hooks/useModal';

import ReadFileDialog from '../Dialogs/ReadFileDialog/ReadFileDialog';

import { BrowserNode } from '../../types/browser.types';

import { ReactComponent as FolderSVG } from '../../assets/folder.svg';
import { ReactComponent as TextSVG } from '../../assets/text-doc.svg';

import styles from './FileBrowserItem.module.css';

const FileBrowserItem: React.FC<{
  browserNode: BrowserNode;
  className?: string;
  onCheckboxChange: (isChecked: boolean, selectedPath: string) => void;
  onClick: (path: string) => void;
}> = ({ browserNode, className, onCheckboxChange, onClick }) => {
  const { name, path, isFolder } = browserNode;

  const { isShown, toggle } = useModal();

  const handleBrowserItemClick = () => {
    if (isFolder) {
      onClick(path);
      return;
    }

    // Opens ReadFileDialog
    toggle();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheckboxChange(isChecked, path);
  };

  const FileIcon: React.FC = () => {
    return (
      <>
        {isFolder ? (
          <FolderSVG className={styles.fileBrowserItemIcon} />
        ) : (
          <TextSVG className={styles.fileBrowserItemIcon} />
        )}
      </>
    );
  };

  return (
    <li className={`${styles.fileBrowserItem} ${className ? className : ''}`}>
      <input
        className={styles.fileBrowserItemCheckbox}
        type='checkbox'
        name='browserItemCheckbox'
        onChange={handleCheckboxChange}
      />
      <button
        className={styles.fileBrowserItemLink}
        onClick={handleBrowserItemClick}
      >
        <FileIcon />
        <span>{name}</span>
      </button>
      {!isFolder && isShown && (
        <ReadFileDialog isShown={isShown} toggle={toggle} filePath={path} />
      )}
    </li>
  );
};

export default React.memo(FileBrowserItem);
