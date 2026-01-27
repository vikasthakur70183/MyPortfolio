import React from 'react';
import styles from './ScrollIndicator.module.css';

function ScrollIndicator() {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.thumb} />
      </div>
    </div>
  );
}

export default ScrollIndicator;

