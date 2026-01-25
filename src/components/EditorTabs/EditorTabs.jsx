import React from 'react';
import styles from './EditorTabs.module.css';

const EditorTabs = ({ activeTab = 'education', onClose, onTabClick }) => {
  const tabs = ['education']; // Future-proof for multiple tabs

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => onTabClick && onTabClick(tab)}
          >
            <span className={styles.tabLabel}>{tab}</span>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onClose && onClose(tab);
              }}
              aria-label={`Close ${tab} tab`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorTabs;
