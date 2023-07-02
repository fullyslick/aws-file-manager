import React from 'react';

import Loader from '../Loader/Loader';

import styles from './Button.module.css';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type: 'submit' | 'button';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading = false,
  disabled,
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className ? className : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader size='small' /> : children}
    </button>
  );
};

export default Button;
