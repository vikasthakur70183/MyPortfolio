import React from 'react';
import styles from './ProjectTabs.module.css';

const CloseIcon = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function ProjectTabs({ activeTab = 'React', onClose, onTabClick }) {
  const tabs = [
    { id: 'React', icon: '⚛' },
    { id: 'Vue', icon: '💚' },
    { id: 'TypeScript', icon: 'TS' },
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabClick && onTabClick(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.id}</span>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onClose && onClose(tab.id);
              }}
              aria-label={`Close ${tab.id} tab`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
        {/* Empty tabs to extend the bar horizontally */}
        <div className={styles.emptyTab} />
        <div className={styles.emptyTab} />
        <div className={styles.emptyTab} />
      </div>
    </div>
  );
}

export default ProjectTabs;

