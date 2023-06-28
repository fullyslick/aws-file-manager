import React from 'react';

import Header from '../../components/UI/Header/Header';

import classes from './BucketViewer.module.css';
import FolderTree from '../../components/FolderTree/FolderTree';

const BucketViewer: React.FC = () => {
  return (
    <div className={classes['bucket-viewer']}>
      <Header />
      <main className={classes['bucket-viewer--main']}>
        <FolderTree className={classes['bucket-viewer--main-folder-tree']} />
        <div className={classes['work-dir']}>work dir</div>
      </main>
    </div>
  );
};

export default BucketViewer;
