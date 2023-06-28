import React, { useEffect, useState, useContext } from 'react';

import FolderTreeNode from './FolderTreeNode';
import { ConfigContext } from '../../contexts/ConfigContext';

import classes from './FolderTree.module.css';

import { getFolderTree } from '../../services/aws-methods';

import { FolderTreeInterface } from '../../types/folder-tree.types';

type FolderTreeProps = {
  className?: string;
};

const FolderTree: React.FC<FolderTreeProps> = ({ className }) => {
  const [folderTree, setFolderTree] = useState<FolderTreeInterface | []>([]);

  const { configData } = useContext(ConfigContext);

  useEffect(() => {
    getFolderTree(configData)
      .then((folderTree) => setFolderTree(folderTree))
      .catch((err) => {
        // Should notify UU
        console.log(err);
      });
  }, []); // TODO should use lastModified from WorkingDir context to refresh tree

  return (
    <div className={`${classes['folder-tree']} ${className ? className : ''}`}>
      <h2>Folder Tree</h2>
      <ul className={classes['folder-tree-list']}>
        {folderTree.length > 0
          ? folderTree.map((folderNode) => (
              <FolderTreeNode
                key={folderNode.path}
                folderNode={folderNode}
                isVisible={true}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default FolderTree;
