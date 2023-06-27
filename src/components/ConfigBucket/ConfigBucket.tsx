import React from 'react';

import classes from './ConfigBucket.module.css';
import logo from '../../assets/logo.svg';

import ConfigBucketForm from './ConfigBucketForm';

const ConfigBucket: React.FC = () => {
  return (
    <div className={classes['config-bucket']}>
      <div className={classes['config-bucket__branding']}>
        <div>
          <img
            src={logo}
            alt='logo'
            className={classes['config-bucket__branding-logo-image']}
          />
          <h1 className={classes['config-bucket__branding-logo-title']}>
            S3 Bucket Viewer
          </h1>
        </div>
        <p className={classes['config-bucket__branding-version']}>
          Version 1.0.0
        </p>
      </div>
      <div className={classes['config-bucket__actions']}>
        <ConfigBucketForm />
      </div>
    </div>
  );
};

export default ConfigBucket;
