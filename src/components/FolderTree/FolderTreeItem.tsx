import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import FolderTreeList from './FolderTreeList';
import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { FolderNode } from '../../types/folder-tree.types';

import classes from './FolderTreeItem.module.css';

const FolderTreeItem: React.FC<{
  folderNode: FolderNode;
  isVisible?: boolean;
  // Should be isVisible = false by default;
  // Context hold info about currently opened folderNode
  // if currently opened folderNode startsWith this component "path", then this component should be visible
}> = ({ isVisible = true, folderNode }) => {
  const { name, path, childFolders } = folderNode;

  const { setWorkingDir } = useContext(WorkingDirContext);

  const handleFolderNodeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    setWorkingDir(path);
  };

  return (
    <li
      className={`${classes['folder-tree-item']} ${
        isVisible ? classes['folder-tree-item__active'] : ''
      }`}
    >
      <a href={path} onClick={handleFolderNodeClick}>
        {name}
      </a>
      {childFolders.length > 0 && <FolderTreeList folderTree={childFolders} />}
    </li>
  );
};

export default React.memo(FolderTreeItem);
