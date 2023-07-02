import React from 'react';
import styles from './Loader.module.css';
import { ReactComponent as LoaderSVGSmall } from '../../../assets/loader-s.svg';
import { ReactComponent as LoaderSVG } from '../../../assets/loader-m.svg';

type LoaderProps = {
  size?: 'small' | 'regular';
  color?: 'white' | 'black';
};

const Loader: React.FC<LoaderProps> = ({
  size = 'regular',
  color = 'white',
}: LoaderProps) => {
  return (
    <>
      {size === 'regular' ? (
        <LoaderSVG
          className={`${styles.loader} ${
            color === 'black' ? styles['loader--black'] : ''
          }`}
        />
      ) : (
        <LoaderSVGSmall className={styles.loader} />
      )}
    </>
  );
};

export default Loader;
