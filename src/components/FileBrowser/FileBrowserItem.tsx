import React, { useContext } from 'react';

import useModal from '../../hooks/useModal';

import ReadFileDialog from '../Dialogs/ReadFileDialog/ReadFileDialog';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import { BrowserNode } from '../../types/browser.types';

import { ReactComponent as FolderSVG } from '../../assets/folder.svg';
import { ReactComponent as TextSVG } from '../../assets/text-doc.svg';

import classes from './FileBrowserItem.module.css';

const FileBrowserItem: React.FC<{
  browserNode: BrowserNode;
  className?: string;
  onCheckboxChange: (isChecked: boolean, selectedPath: string) => void;
}> = ({ browserNode, className, onCheckboxChange }) => {
  const { name, path, isFolder } = browserNode;

  const { setWorkingDir } = useContext(WorkingDirContext);

  const { isShown, toggle } = useModal();

  const handleBrowserItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (isFolder) {
      setWorkingDir(path);
      return;
    }

    // Opens ReadFileDialog
    toggle();
  };

  const itemClassName = `${classes['file-browser-item']} ${
    isFolder ? classes['file-browser-item--folder'] : ''
  } ${className ? className : ''}`;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheckboxChange(isChecked, path);
  };

  const FileIcon: React.FC = () => {
    return (
      <>
        {isFolder ? (
          <FolderSVG className={classes['file-browser-item--icon']} />
        ) : (
          <TextSVG className={classes['file-browser-item--icon']} />
        )}
      </>
    );
  };

  return (
    <li className={itemClassName}>
      <input
        className={classes['file-browser-item__checkbox']}
        type='checkbox'
        onChange={handleCheckboxChange}
        data-item-key={path}
      />
      <a
        className={classes['file-browser-item__link']}
        onClick={handleBrowserItemClick}
        href={path}
      >
        <FileIcon />
        <span>{name}</span>
      </a>
      {!isFolder && isShown && (
        <ReadFileDialog isShown={isShown} toggle={toggle} filePath={path} />
      )}
    </li>
  );
};

export default React.memo(FileBrowserItem);
