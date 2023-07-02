import React from 'react';

import styles from './ConfigBucket.module.css';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

import ConfigBucketForm from './ConfigBucketForm';

const ConfigBucket: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.branding}>
        <div>
          <LogoSVG className={styles.brandingLogoImage} />
          <h1 className={styles.brandingLogoTitle}>S3 Bucket Viewer</h1>
        </div>
        <p className={styles.brandingVersion}>Version 1.0.0</p>
      </div>
      <div className={styles.credentials}>
        <ConfigBucketForm />
      </div>
    </main>
  );
};

export default ConfigBucket;
