import React from 'react';

import { FolderTreeInterface } from '../../types/folder-tree.types';

import FolderTreeItem from './FolderTreeItem';

import classes from './FolderTreeList.module.css';

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
      className={`${classes['folder-tree-list']} ${className ? className : ''}`}
    >
      {folderTree.length > 0
        ? folderTree.map((folderNode) => (
            <FolderTreeItem
              key={folderNode.path}
              folderNode={folderNode}
              isVisible={true}
            />
          ))
        : null}
    </ul>
  );
};

export default FolderTreeList;
