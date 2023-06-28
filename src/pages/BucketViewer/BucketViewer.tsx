import React from 'react';

import Header from '../../components/UI/Header/Header';

import classes from './BucketViewer.module.css';
import FolderTree from '../../components/FolderTree/FolderTree';

const BucketViewer: React.FC = () => {
  return (
    <div className={classes['bucket-viewer']}>
      <Header />
      <main>
        <FolderTree />
      </main>
    </div>
  );
};

export default BucketViewer;
