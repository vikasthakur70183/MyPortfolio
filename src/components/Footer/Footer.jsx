import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <span className={styles.findMeText}>find me in:</span>

          <div className={styles.socialIcons} role="group" aria-label="Social media links">
            <button className={styles.iconTab} aria-label="Twitter">
              <i className="ri-twitter-x-fill" />
            </button>

            <button className={styles.iconTab} aria-label="LinkedIn">
              <i className="ri-linkedin-fill" />
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <span className={styles.username}>@username</span>
          <button className={styles.iconTab} aria-label="GitHub">
            <i className="ri-github-fill" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
