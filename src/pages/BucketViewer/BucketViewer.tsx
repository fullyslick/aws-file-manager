import React from 'react';

import Header from '../../components/UI/Header/Header';

import classes from './BucketViewer.module.css';

const BucketViewer: React.FC = () => {
  return (
    <div className={classes['bucket-viewer']}>
      <Header />
      <main>Folder Tree and WorkingDir</main>
    </div>
  );
};

export default BucketViewer;
