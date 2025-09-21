import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import styles from './index.module.css';

type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  type?: string;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ id, label, name, register, placeholder, type = 'text', error }) => (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  ),
);

export default InputField;
