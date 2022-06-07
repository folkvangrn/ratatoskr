import { Navigation } from '../Navigation/Navigation';
import styles from './Dashboard.module.scss';

export function Dashboard({ children }: { children: any }) {
  return (
    <div className={styles.dashboardWrapper}>
      <Navigation />
      {children}
    </div>
  );
}
