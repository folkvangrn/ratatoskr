
   
import { useField } from 'formik';
import { TextareaHTMLAttributes } from 'react';

import styles from './TextAreaFieldInput.module.scss';

type TextFieldInputProps = {
  label: string;
  props?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  name: string;
};

export function TextAreaFieldInput({ label, name, ...props }: TextFieldInputProps) {
  const [field, meta] = useField(name);

  return (
    <div className={styles.textFieldWrapper} key={label}>
      <div className={styles.textAreaWrapper}>
        <label htmlFor={name}>{label}</label>
        <textarea {...field} {...props} />
      </div>
      {meta.touched && meta.error ? <p className={styles.errorMessage}>{meta.error}</p> : null}
    </div>
  );
}