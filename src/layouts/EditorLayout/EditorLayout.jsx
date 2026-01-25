import React from 'react';
import styles from './EditorLayout.module.css';

function EditorLayout({ sidebar, editor, snippetPanel }) {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>

      <div className={styles.divider} />

      <main className={styles.editor}>{editor}</main>

      <div className={styles.divider} />

      <aside className={styles.snippetPanel}>{snippetPanel}</aside>
    </section>
  );
}

export default EditorLayout;
