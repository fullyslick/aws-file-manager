import React, { useContext } from 'react';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { BrowserNode } from '../../types/browser.types';

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

    setWorkingDir(path);
  };

  const itemClassName = `${classes['file-browser-item']} ${
    isFolder ? classes['file-browser-item--folder'] : ''
  } ${className ? className : ''}`;

  return (
    <li className={itemClassName}>
      <input type='checkbox' onChange={() => {}} data-item-key={path} />
      <a href={path} style={{ color: isFolder ? 'blue' : 'black' }}>
        {name}
      </a>
    </li>
  );
};

export default React.memo(FileBrowserItem);
