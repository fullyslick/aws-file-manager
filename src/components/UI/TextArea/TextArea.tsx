import React, { FC } from 'react';

import classes from './TextArea.module.css';

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
      <label htmlFor={name} className={classes['textarea__label']}>
        {label}
      </label>
      <textarea
        className={classes['textarea']}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className={classes['textarea__error']}>{error}</p>
    </div>
  );
};

export default React.memo(TextArea);
