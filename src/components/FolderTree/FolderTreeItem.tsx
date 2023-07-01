import React, { useContext } from 'react';

import FolderTreeList from './FolderTreeList';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import { FolderNode } from '../../types/folder-tree.types';

import { ReactComponent as StorageSVG } from '../../assets/cloud-storage.svg';
import { ReactComponent as FolderSVG } from '../../assets/folder.svg';

import classes from './FolderTreeItem.module.css';

const FolderTreeItem: React.FC<{
  folderNode: FolderNode;
  isVisible?: boolean;
  isRoot?: boolean;
  className?: string;
  // Should be isVisible = false by default;
  // Context hold info about currently opened folderNode
  // if currently opened folderNode startsWith this component "path", then this component should be visible
}> = ({ folderNode, isVisible = true, isRoot = false, className }) => {
  const { name, path, childFolders } = folderNode;

  const { setWorkingDir, workingDir } = useContext(WorkingDirContext);

  const handleFolderNodeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    setWorkingDir(path);
  };

  const itemClassName = `${classes['folder-tree-list__item']} 
  ${isVisible ? classes['folder-tree-list__item--open'] : ''}
  ${className ? className : ''}`;

  const linkClassName = `${classes['folder-tree-list__item-link']}
  ${workingDir === path ? classes['folder-tree-list__item-link--active'] : ''}
  ${
    childFolders.length > 0
      ? classes['folder-tree-list__item-link--expandable']
      : ''
  }
  `;

  const Icon: React.FC = () => {
    return <>{isRoot ? <StorageSVG /> : <FolderSVG />}</>;
  };

  return (
    <li className={itemClassName}>
      <a href={path} className={linkClassName} onClick={handleFolderNodeClick}>
        <Icon />
        <span>{name}</span>
      </a>
      {childFolders.length > 0 && <FolderTreeList folderTree={childFolders} />}
    </li>
  );
};

export default React.memo(FolderTreeItem);
