import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';

import classes from './Header.module.css';

import { ReactComponent as LogoSVG } from '../../../assets/logo.svg';
import { ReactComponent as ServerCloseSVG } from '../../../assets/server-close-icon.svg';

const Header: React.FC = () => {
  const { clearConfig } = useContext(ConfigContext);

  const handleDisconnect = () => {
    clearConfig();
  };

  return (
    <header className={classes.header}>
      <div className={classes['header__logo-wrapper']}>
        <LogoSVG className={classes['header__logo']} />
        <h1 className={classes['header__logo-title']}>S3 Bucket Viewer</h1>
      </div>
      <div className={classes['header-actions']}>
        <button
          onClick={handleDisconnect}
          type='button'
          className={classes['header-actions__disconnect']}
        >
          <ServerCloseSVG
            className={classes['header-actions__disconnect-icon']}
          />
          <span>Disconnect</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
