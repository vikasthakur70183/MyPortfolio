import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.leftSection}>
        <span className={styles.findMeText}>find me in:</span>
        
        <div className={styles.socialIcons} role="group" aria-label="Social media links">
          <button
            type="button"
            className={styles.iconPlaceholder}
            aria-label="Find me on Twitter"
            tabIndex={0}
          >
            <span aria-hidden="true">▢</span>
          </button>
          
          <button
            type="button"
            className={styles.iconPlaceholder}
            aria-label="Find me on LinkedIn"
            tabIndex={0}
          >
            <span aria-hidden="true">▢</span>
          </button>
          
          <button
            type="button"
            className={styles.iconPlaceholder}
            aria-label="Find me on another platform"
            tabIndex={0}
          >
            <span aria-hidden="true">▢</span>
          </button>
        </div>
      </div>
      
      <div className={styles.centerSection} aria-hidden="true">
      </div>
      
      <div className={styles.rightSection}>
        <span className={styles.username}>@username</span>
        
        <button
          type="button"
          className={styles.githubPlaceholder}
          aria-label="View GitHub profile"
          tabIndex={0}
        >
          <span aria-hidden="true">▢</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer

