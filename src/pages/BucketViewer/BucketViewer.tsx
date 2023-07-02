import React from 'react';

import { WorkingDirProvider } from '../../contexts/WorkingDirContext';
import { SelectedFilesProvider } from '../../contexts/SelectedFilesContext';

import Header from '../../components/UI/Header/Header';
import FolderTree from '../../components/FolderTree/FolderTree';
import WorkingDirectory from '../../components/WorkingDirectory/WorkingDirectory';

import useLeavePrompt from '../../hooks/useLeavePrompt';

import styles from './BucketViewer.module.css';

const BucketViewer: React.FC = () => {
  useLeavePrompt();

  return (
    <div className={styles.bucketViewer}>
      <Header />
      <main className={styles.bucketViewerMain}>
        <WorkingDirProvider>
          <FolderTree className={styles.bucketViewerFolderTree} />
          <SelectedFilesProvider>
            <WorkingDirectory className={styles.bucketViewerWorkingDirectory} />
          </SelectedFilesProvider>
        </WorkingDirProvider>
      </main>
    </div>
  );
};

export default BucketViewer;
