import React, { FC } from 'react';

import styles from './TextArea.module.css';

interface TextAreProps {
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

const TextArea: FC<TextAreProps> = ({
  label,
  value,
  name,
  placeholder,
  error,
  className,
  onChange,
}) => {
  const textareaClassName = className || '';

  return (
    <div {...(textareaClassName ? { className: textareaClassName } : {})}>
      <label htmlFor={name} className={styles.textareaLabel}>
        {label}
      </label>
      <textarea
        className={`${styles.textarea} ${error ? styles.textareaInvalid : ''}`}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className={styles.textareaError}>{error}</p>
    </div>
  );
};

export default React.memo(TextArea);
