import React from 'react';

import { WorkingDirProvider } from '../../contexts/WorkingDirContext';
import { SelectedFilesProvider } from '../../contexts/SelectedFilesContext';

import Header from '../../components/UI/Header/Header';
import FolderTree from '../../components/FolderTree/FolderTree';
import WorkingDirectory from '../../components/WorkingDirectory/WorkingDirectory';

import useLeavePrompt from '../../hooks/useLeavePrompt';

import classes from './BucketViewer.module.css';

const BucketViewer: React.FC = () => {
  useLeavePrompt();

  return (
    <div className={classes['bucketViewer']}>
      <Header />
      <main className={classes['bucketViewerMain']}>
        <WorkingDirProvider>
          <FolderTree className={classes['bucketViewerFolderTree']} />
          <SelectedFilesProvider>
            <WorkingDirectory
              className={classes['bucketViewerWorkingDirectory']}
            />
          </SelectedFilesProvider>
        </WorkingDirProvider>
      </main>
    </div>
  );
};

export default BucketViewer;
