import React, { useContext, useState, useRef } from 'react';

import FolderTreeList from './FolderTreeList';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import useDoubleClick from '../../hooks/useDoubleClick';

import { FolderNode } from '../../types/folder-tree.types';

import { ReactComponent as StorageSVG } from '../../assets/cloud-storage.svg';
import { ReactComponent as FolderSVG } from '../../assets/folder.svg';

import classes from './FolderTreeItem.module.css';

const FolderTreeItem: React.FC<{
  folderNode: FolderNode;
  isRoot?: boolean;
  className?: string;
}> = ({ folderNode, isRoot = false, className }) => {
  const { name, path, childFolders } = folderNode;

  const { setWorkingDir, workingDir } = useContext(WorkingDirContext);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const expandFolder = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const displayContent = () => {
    setIsExpanded(true);
    setWorkingDir(path);
  };

  const folderBtnRef = useRef<HTMLButtonElement | null>(null);

  useDoubleClick({
    ref: folderBtnRef,
    onSingleClick: expandFolder,
    onDoubleClick: displayContent,
  });

  const itemClassName = `${classes['folder-tree-list__item']} 
  ${className ? className : ''}`;

  const linkClassName = `${classes['folder-tree-list__item-btn']}
  ${
    workingDir === path ||
    (!isExpanded && workingDir.startsWith(path) && !isRoot)
      ? classes['folder-tree-list__item-btn--active']
      : ''
  }
  ${
    childFolders.length > 0
      ? classes['folder-tree-list__item-btn--expandable']
      : ''
  }
  ${isExpanded ? classes['folder-tree-list__item-btn--open'] : ''}
  `;

  const Icon: React.FC = () => {
    return <>{isRoot ? <StorageSVG /> : <FolderSVG />}</>;
  };

  return (
    <li className={itemClassName}>
      <button className={linkClassName} ref={folderBtnRef}>
        <Icon />
        <span>{name}</span>
      </button>
      {childFolders.length > 0 && isExpanded && (
        <FolderTreeList folderTree={childFolders} />
      )}
    </li>
  );
};

export default React.memo(FolderTreeItem);
