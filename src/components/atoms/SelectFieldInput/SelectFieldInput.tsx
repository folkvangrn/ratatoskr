import { useField } from 'formik';
import { SelectHTMLAttributes } from 'react';

import styles from './SelectFieldInput.module.scss';

type SelectFieldInputProps = {
  label: string;
  name: string;
  isEmpty?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectFieldInput({
  label,
  isEmpty,
  ...props
}: SelectFieldInputProps) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textFieldWrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor={props.name}>{label}</label>
        <select {...field} {...props} />
      </div>
      {isEmpty && <p>{`${label} list is empty`}</p>}
      {meta.touched && meta.error ? (
        <div className={styles.errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
}
