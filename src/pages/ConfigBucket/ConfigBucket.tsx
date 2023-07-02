import React from 'react';

import classes from './ConfigBucket.module.css';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

import ConfigBucketForm from './ConfigBucketForm';

const ConfigBucket: React.FC = () => {
  return (
    <main className={classes['ConfigBucket']}>
      <div className={classes['ConfigBucket__branding']}>
        <div>
          <LogoSVG className={classes['ConfigBucket__branding-logo-image']} />
          <h1 className={classes['ConfigBucket__branding-logo-title']}>
            S3 Bucket Viewer
          </h1>
        </div>
        <p className={classes['ConfigBucket__branding-version']}>
          Version 1.0.0
        </p>
      </div>
      <div className={classes['ConfigBucket__actions']}>
        <ConfigBucketForm />
      </div>
    </main>
  );
};

export default ConfigBucket;
