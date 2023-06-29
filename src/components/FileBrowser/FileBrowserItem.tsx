import React, { useContext } from 'react';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { BrowserNode } from '../../types/browser.types';

import { ReactComponent as FolderSVG } from '../../assets/folder.svg';
import { ReactComponent as TextSVG } from '../../assets/text-doc.svg';

import classes from './FileBrowserItem.module.css';

const FileBrowserItem: React.FC<{
  browserNode: BrowserNode;
  className?: string;
}> = ({ browserNode, className }) => {
  const { name, path, isFolder } = browserNode;

  const { setWorkingDir } = useContext(WorkingDirContext);

  const handleBrowserItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (isFolder) {
      setWorkingDir(path);
      return;
    }

    console.log('Open file ' + path);
  };

  const itemClassName = `${classes['file-browser-item']} ${
    isFolder ? classes['file-browser-item--folder'] : ''
  } ${className ? className : ''}`;

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
        onChange={() => {}}
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
    </li>
  );
};

export default React.memo(FileBrowserItem);
