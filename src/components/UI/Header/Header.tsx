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
      <div className={styles.headerLogoWrapper}>
        <LogoSVG className={styles.headerLogo} />
        <h1 className={styles.headerLogoTitle}>S3 Bucket Viewer</h1>
      </div>
      <div className={styles.headerActions}>
        <button
          onClick={handleDisconnect}
          type='button'
          className={styles.headerActionsDisconnect}
        >
          <ServerCloseSVG className={styles.headerActionsDisconnectIcon} />
          <span>Disconnect</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
