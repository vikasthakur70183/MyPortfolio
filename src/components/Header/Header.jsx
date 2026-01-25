import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navLinks = [
    { path: '/', label: '_hello' },
    { path: '/about-me', label: '_about-me' },
    { path: '/projects', label: '_projects' },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.brand}>
          <NavLink to="/" className={styles.brandLink}>
            michael-weaver
          </NavLink>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navLinks.map(({ path, label }) => (
              <li key={path} className={styles.navItem}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <NavLink
            to="/contact-me"
            className={({ isActive }) =>
              `${styles.contactLink} ${isActive ? styles.active : ''}`
            }
          >
            _contact-me
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;

