import { ReactNode } from 'react';

import { Button } from '@/components/atoms/Button/Button';

import styles from './ListWrapper.module.scss';

type ListWrapperProps = {
  children: ReactNode[];
  handleOpenModal: VoidFunction;
  singularName: string;
  handleChangeSearchInput?: (value: string) => void;
};

export function ListWrapper({
  children,
  handleOpenModal,
  singularName,
  handleChangeSearchInput,
}: ListWrapperProps) {
  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input
            placeholder="Search"
            type="text"
            onChange={e =>
              handleChangeSearchInput && handleChangeSearchInput(e.target.value)
            }
          />
          <Button
            text={`Add ${singularName}`}
            className={styles.addButton}
            onClick={handleOpenModal}
          />
        </div>
        <div className={styles.tableContent}>{children}</div>
      </div>
    </main>
  );
}
