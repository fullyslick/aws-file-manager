import React, { FC } from 'react';

import styles from './Input.module.css';

interface InputProps {
  type: 'text';
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
  const inputClassName = className || '';

  return (
    <div {...(inputClassName ? { className: inputClassName } : {})}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className={styles.inputError}>{error}</p>
    </div>
  );
};

export default React.memo(Input);
