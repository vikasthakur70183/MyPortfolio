import React from 'react';
import styles from './SnippetPanel.module.css';

const SnippetCard = ({ snippet }) => {
  const { avatar, username, createdDate, starCount, codeSnippet, onDetails } = snippet;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatar} alt={`${username}'s avatar`} className={styles.avatar} />
        <div className={styles.userInfo}>
          <p className={styles.username}>{username}</p>
          <p className={styles.date}>{new Date(createdDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stars}>
          <span className={styles.starIcon}>⭐</span>
          {starCount}
        </div>
        <button className={styles.detailsButton} onClick={onDetails}>
          details
        </button>
      </div>
      <pre className={styles.codePreview}>
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
};

export default SnippetCard;
