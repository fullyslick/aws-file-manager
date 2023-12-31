import React, { useEffect, useState, useContext } from 'react';

import FolderTreeList from './FolderTreeList';
import FolderTreeItem from './FolderTreeItem';
import ErrorDialog from '../Dialogs/ErrorDialog/ErrorDialog';

import { ConfigContext } from '../../contexts/ConfigContext';
import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import useModal from '../../hooks/useModal';

import { getFolderTree } from '../../services/aws-methods';

import { FolderTreeInterface } from '../../types/folder-tree.types';

import styles from './FolderTree.module.css';

type FolderTreeProps = {
  className?: string;
};

const FolderTree: React.FC<FolderTreeProps> = ({ className }) => {
  const [folderTree, setFolderTree] = useState<FolderTreeInterface | []>([]);

  const { configData } = useContext(ConfigContext);
  const { lastModified } = useContext(WorkingDirContext);

  const { isShown: hasError, toggle } = useModal();

  useEffect(() => {
    getFolderTree(configData)
      .then((folderTree) => setFolderTree(folderTree))
      .catch((err) => {
        console.log(err);
        toggle();
      });
  }, [lastModified, configData, toggle]);

  return (
    <aside className={`${styles.folderTree} ${className ? className : ''}`}>
      {hasError ? (
        <ErrorDialog
          isShown={hasError}
          toggle={toggle}
          headerText='Unable to retrieve data!'
        />
      ) : (
        <ul>
          <FolderTreeItem
            folderNode={{
              name: configData.bucket!,
              path: '',
              childFolders: [],
            }}
            isRoot={true}
            className={styles.folderTreeRootItem}
          />
          <FolderTreeList folderTree={folderTree} />
        </ul>
      )}
    </aside>
  );
};

export default FolderTree;
