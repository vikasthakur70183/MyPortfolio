import React from 'react';
import styles from './Home.module.css';
import SnakeGame from '../../components/SnakeGame/SnakeGame';

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        {/* LEFT PANEL */}
        <div className={styles.leftSection}>
          <p className={styles.mutedText}>Hi all. I am</p>

          <h1 className={styles.heading}>
            Vikas Thakur
          </h1>

          <p className={styles.role}>
            <span className={styles.arrow}>&gt;</span> Front-end developer
          </p>

          <div className={styles.codeBlock}>
            <p className={styles.codeComment}>
              // complete the game to continue
            </p>
            <p className={styles.codeComment}>
              // find my profile on Github:
            </p>
            <p className={styles.codeLine}>
              const <span className={styles.codeVar}>githubLink</span> ={" "}
              <span className={styles.codeString}>
                "https://github.com/your-username"
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightSection}>
          <SnakeGame />
        </div>
      </div>
    </section>
  );
}

export default Home;
