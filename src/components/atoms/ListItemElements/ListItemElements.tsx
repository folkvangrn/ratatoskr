import { ReactNode } from 'react';

import styles from './ListItemElements.module.scss';

type ListItemElementsProps = {
  componentsArray: ReactNode[];
};

export function ListItemElements({ componentsArray }: ListItemElementsProps) {
  return (
    <div className={styles.wrapper}>
      {componentsArray.map((component, i) => (
        <div key={i} className={styles.gridChild}>
          {component}
        </div>
      ))}
    </div>
  );
}
