import ReactModal from 'react-modal';

import styles from './Modal.module.scss';

type ModalProps = {
  headerText: string;
  children: JSX.Element;
  isOpen: boolean;
  handleClose: VoidFunction;
};

export function Modal({
  headerText,
  children,
  isOpen,
  handleClose,
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.modalWrapper}
      onRequestClose={handleClose}
      appElement={document.getElementById('root')!}
    >
      <header className={styles.modalHeader}>
        <h3>{headerText}</h3>
      </header>
      <div className={styles.modalContent}>{children}</div>
    </ReactModal>
  );
}
