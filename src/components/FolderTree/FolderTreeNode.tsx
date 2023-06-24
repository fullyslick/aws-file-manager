import React, { useState } from 'react';
import { FolderNode } from '../../types/folder-tree.types';
import classes from './FolderTreeNode.module.css';

const FolderTreeNode: React.FC<{
  folderNode: FolderNode;
  isVisible?: boolean;
  // Should be isVisible = false by default; Context should keep track of opened nodes
}> = ({ isVisible = true, folderNode }) => {
  const { name, path, childFolders } = folderNode;

  return (
    <li
      className={`${classes['folder-tree-node']} ${
        isVisible ? classes['folder-tree-node__active'] : ''
      }`}
    >
      <a href={path}>{name}</a>
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

export default FolderTreeNode;
