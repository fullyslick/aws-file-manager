import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';

import styles from './Header.module.css';

import { ReactComponent as LogoSVG } from '../../../assets/logo.svg';
import { ReactComponent as ServerCloseSVG } from '../../../assets/server-close-icon.svg';

const Header: React.FC = () => {
  const { clearConfig } = useContext(ConfigContext);

  const handleDisconnect = () => {
    clearConfig();
  };

  return (
    <header className={styles.header}>
      <div className={styles['header__logo-wrapper']}>
        <LogoSVG className={styles['header__logo']} />
        <h1 className={styles['header__logo-title']}>S3 Bucket Viewer</h1>
      </div>
      <div className={styles['header-actions']}>
        <button
          onClick={handleDisconnect}
          type='button'
          className={styles['header-actions__disconnect']}
        >
          <ServerCloseSVG
            className={styles['header-actions__disconnect-icon']}
          />
          <span>Disconnect</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
