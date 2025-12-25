import { Link } from 'react-router-dom';
import styles from '../app.module.css';

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navBrand}>
          Home        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/page1" className={styles.navLink}>Page 1</Link>
          </li>
          <li>
            <Link to="/page2" className={styles.navLink}>Page 2</Link>
          </li>
          <li>
            <Link to="/page3" className={styles.navLink}>Page 3</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
