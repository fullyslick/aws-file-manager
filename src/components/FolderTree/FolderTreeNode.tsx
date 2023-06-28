import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { FolderNode } from '../../types/folder-tree.types';

import classes from './FolderTreeNode.module.css';

const FolderTreeNode: React.FC<{
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
      className={`${classes['folder-tree-node']} ${
        isVisible ? classes['folder-tree-node__active'] : ''
      }`}
    >
      <a href={path} onClick={handleFolderNodeClick}>
        {name}
      </a>
      {childFolders.length > 0 && (
        <ul>
          {childFolders.map((childFolder) => (
            <FolderTreeNode key={childFolder.path} folderNode={childFolder} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default React.memo(FolderTreeNode);
