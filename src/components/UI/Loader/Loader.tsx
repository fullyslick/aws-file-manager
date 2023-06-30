import React from 'react';
import classes from './Loader.module.css';
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
          className={`${classes.loader} ${
            color === 'black' ? classes['loader--black'] : ''
          }`}
        />
      ) : (
        <LoaderSVGSmall className={classes.loader} />
      )}
    </>
  );
};

export default Loader;
