import React, { FC } from 'react';

interface InputProps {
  type: 'text' | 'textarea';
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  error: string;
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
  onChange,
}) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className='validation-error'>{error}</p>
    </div>
  );
};

export default React.memo(Input);
