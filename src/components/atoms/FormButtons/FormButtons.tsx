import { Button } from '@/components/atoms/Button/Button';
import styles from './FormButtons.module.scss';

type FormButtonsProps = {
  buttonsText: string[];
  handleCloseForm: VoidFunction;
};

export function FormButtons({
  buttonsText,
  handleCloseForm,
}: FormButtonsProps) {
  const [firstButtonText, secondButtonText] = buttonsText;
  return (
    <div className={styles.buttonsWrapper}>
      <Button text={firstButtonText} type="submit" />
      <Button text={secondButtonText} onClick={handleCloseForm} />
    </div>
  );
}
