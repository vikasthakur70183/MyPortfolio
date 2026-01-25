import React from 'react';
import styles from './SnippetPanel.module.css';
import SnippetCard from './SnippetCard';

const SnippetPanel = ({ snippets = [] }) => {
  return (
    <div className={styles.panel}>
      {snippets.length === 0 ? (
        <p className={styles.emptyState}>
          No snippets available
        </p>
      ) : (
        snippets.map((snippet, index) => (
          <SnippetCard key={index} snippet={snippet} />
        ))
      )}
    </div>
  );
};

export default SnippetPanel;

