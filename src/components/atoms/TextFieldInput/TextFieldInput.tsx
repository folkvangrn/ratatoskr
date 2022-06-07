import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

import styles from './TextFieldInput.module.scss';

type TextFieldInputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextFieldInput({ label, name, ...props }: TextFieldInputProps) {
  const [field, meta] = useField(name);

  return (
    <div className={styles.textFieldWrapper} key={label}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>{label}</label>
        <input {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <p className={styles.errorMessage}>{meta.error}</p>
      ) : null}
    </div>
  );
}
