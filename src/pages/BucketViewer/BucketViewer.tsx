import React from 'react';

import { WorkingDirProvider } from '../../contexts/WorkingDirContext';

import Header from '../../components/UI/Header/Header';
import FolderTree from '../../components/FolderTree/FolderTree';
import WorkingDirectory from '../../components/WorkingDirectory/WorkingDirectory';

import classes from './BucketViewer.module.css';

const BucketViewer: React.FC = () => {
  return (
    <div className={classes['bucket-viewer']}>
      <Header />
      <main className={classes['bucket-viewer--main']}>
        <WorkingDirProvider>
          <FolderTree className={classes['bucket-viewer--main-folder-tree']} />
          <WorkingDirectory
            className={classes['bucket-viewer--main-working-directory']}
          />
        </WorkingDirProvider>
      </main>
    </div>
  );
};

export default BucketViewer;
