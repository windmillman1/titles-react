import { Link } from 'react-router-dom';
import styles from '../app.module.css';

function Footer() {
  return (
    <footer>
      <div>
        <div>
          <p>&copy; 2025 Titles React. All rights reserved.</p>
          <div className={styles.footerLinks}>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
