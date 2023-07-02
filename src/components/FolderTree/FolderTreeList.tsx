import React from 'react';

import { FolderTreeInterface } from '../../types/folder-tree.types';

import FolderTreeItem from './FolderTreeItem';

import styles from './FolderTreeList.module.css';

type FolderTreeListProps = {
  className?: string;
  folderTree: FolderTreeInterface;
};

const FolderTreeList: React.FC<FolderTreeListProps> = ({
  className,
  folderTree,
}) => {
  return (
    <ul
      className={`${styles['folder-tree-list']} ${className ? className : ''}`}
    >
      {folderTree.length > 0
        ? folderTree.map((folderNode) => (
            <FolderTreeItem key={folderNode.path} folderNode={folderNode} />
          ))
        : null}
    </ul>
  );
};

export default FolderTreeList;
