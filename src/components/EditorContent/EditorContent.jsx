import React from 'react';
import styles from './EditorContent.module.css';

const EditorContent = ({ content }) => {
  const lines = content.split('\n');

  const highlightLine = (line) => {
    // Basic syntax highlighting for keywords, strings, comments
    const keywordRegex = /\b(function|const|let|var|if|else|for|while|return|import|export|class)\b/g;
    const stringRegex = /(["'`])(.*?)\1/g;
    const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

    let highlighted = line;

    // Highlight comments first
    highlighted = highlighted.replace(commentRegex, (match) => `<span class="${styles.comment}">${match}</span>`);

    // Highlight strings
    highlighted = highlighted.replace(stringRegex, (match) => `<span class="${styles.string}">${match}</span>`);

    // Highlight keywords
    highlighted = highlighted.replace(keywordRegex, (match) => `<span class="${styles.keyword}">${match}</span>`);

    return highlighted;
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.lineNumbers}>
        {lines.map((_, index) => (
          <div key={index} className={styles.lineNumber}>
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.codeContent}>
        {lines.map((line, index) => (
          <div key={index} className={styles.codeLine}>
            <pre dangerouslySetInnerHTML={{ __html: highlightLine(line) }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorContent;
