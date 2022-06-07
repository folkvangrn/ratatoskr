import { Link } from 'react-router-dom';

import styles from './Navigation.module.scss';

type NavbarItemProps = {
  path: string;
};

const NavbarItem = ({ path }: NavbarItemProps) => {
  return (
    <div className={styles.navbarItem}>
      <Link className={styles.navLink} to={`/${path}`}>
        <p>{path}</p>
      </Link>
    </div>
  );
};

export function Navigation() {
  const paths = ['orders', 'clients'];

  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navigationWrapper}>
        {paths.map(path => (
          <NavbarItem path={path} key={path} />
        ))}
      </nav>
    </div>
  );
}
