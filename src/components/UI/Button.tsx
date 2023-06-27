import React from 'react';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode | string;
  color?: 'light' | 'dark';
  disabled?: boolean;
  type: 'submit' | 'button';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = 'light',
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} color={color} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
