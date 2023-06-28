import React, { FC } from 'react';

import classes from './Input.module.css';

interface InputProps {
  type: 'text' | 'textarea';
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  error: string;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  className,
  onChange,
}) => {
  return (
    <div
      className={`${classes['input-wrapper']} ${className ? className : ''}`}
    >
      <label htmlFor={name} className={classes['input__label']}>
        {label}
      </label>
      <input
        className={classes['input']}
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className={classes['input__error']}>{error}</p>
    </div>
  );
};

export default React.memo(Input);
