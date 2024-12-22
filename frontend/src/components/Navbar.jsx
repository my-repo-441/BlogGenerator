import React from 'react';
import { Link } from 'react-router-dom';
// import { FaHome, FaUtensils, FaSave, FaInfoCircle } from 'react-icons/fa'; // FontAwesomeのアイコン
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Menu</h2>
      <ul className={styles.sidebarNav}>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
