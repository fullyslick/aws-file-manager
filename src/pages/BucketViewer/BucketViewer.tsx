import React from 'react';

import Header from '../../components/UI/Header/Header';
import FolderTree from '../../components/FolderTree/FolderTree';
import WorkingDirectory from '../../components/WorkingDirectory/WorkingDirectory';

import classes from './BucketViewer.module.css';

const BucketViewer: React.FC = () => {
  return (
    <div className={classes['bucket-viewer']}>
      <Header />
      <main className={classes['bucket-viewer--main']}>
        <FolderTree className={classes['bucket-viewer--main-folder-tree']} />
        <WorkingDirectory
          className={classes['bucket-viewer--main-working-directory']}
        />
      </main>
    </div>
  );
};

export default BucketViewer;
