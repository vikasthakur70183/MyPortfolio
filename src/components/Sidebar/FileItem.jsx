import React from 'react';
import { RiFileTextLine } from 'react-icons/ri';
import styles from './Sidebar.module.css';

const FileItem = ({ name, isActive, onClick, icon }) => {
  return (
    <li>
      <button
        className={`${styles.fileItem} ${isActive ? styles.active : ''}`}
        onClick={onClick}
        type="button"
      >
        <span className={styles.fileIcon}>
          {icon || <RiFileTextLine />}
        </span>
        {name}
      </button>
    </li>
  );
};

export default FileItem;

