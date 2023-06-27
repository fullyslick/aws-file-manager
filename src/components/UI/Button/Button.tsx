import React from 'react';

import Loader from '../Loader/Loader';

import classes from './Button.module.css';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode | string;
  isLoading?: boolean;
  disabled?: boolean;
  type: 'submit' | 'button';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading = false,
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      className={classes['button']}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader size='small' /> : children}
    </button>
  );
};

export default Button;
