import classnames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  type?: JSX.IntrinsicElements['button']['type'];
  text: string;
  className?: string;
  onClick?: VoidFunction;
  disabled?: boolean;
};

export function Button({
  type = 'button',
  text,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={classnames(styles.defaultButton, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
