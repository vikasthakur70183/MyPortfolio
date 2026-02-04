import React, { useState } from 'react';
import { RiFolder3Fill, RiArrowRightSLine } from 'react-icons/ri';
import styles from './Sidebar.module.css';

const FolderItem = ({ name,Foldercolor ,children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <li className={styles.folderItem}>
      <button
        className={`${styles.folderHeader} ${isCollapsed ? styles.collapsed : ''}`}
        onClick={toggleCollapse}
        aria-expanded={!isCollapsed}
        type="button"
      >
        <span className={`${styles.chevron} ${!isCollapsed ? styles.expanded : ''}`}>
          <RiArrowRightSLine />
        </span>
        <span className={`${styles.folderIcon} ${styles.folderIcon1}`}>
          <RiFolder3Fill color={Foldercolor} />
          </span>
        {name}
      </button>
      {!isCollapsed && (
        <ul className={styles.folderContent}>
          {children}
        </ul>
      )}
    </li>
  );
};

export default FolderItem;

