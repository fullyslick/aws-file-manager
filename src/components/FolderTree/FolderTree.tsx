import React, { useEffect, useState } from 'react';

import FolderTreeNode from './FolderTreeNode';

import classes from './FolderTree.module.css';

import { getFolderTree } from '../../services/aws-methods';

import { FolderTree } from '../../types/folder-tree.types';

const FolderTreeList: React.FC = () => {
  const [folderTree, setFolderTree] = useState<FolderTree | []>([]);

  useEffect(() => {
    // getFolderTree()
    //   .then((folderTree) => setFolderTree(folderTree))
    //   .catch((err) => {
    //     // Should notify UU
    //     console.log(err);
    //   });
  }, []);

  return (
    <>
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
    </>
  );
};

export default FolderTreeList;
