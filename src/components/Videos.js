import React from 'react';
import styles from '../app.module.css';

function Videos() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wikipediaContainer}>
        <header className={styles.wikipediaHeader}>
          <h1 className={styles.wikipediaTitle}>Videos</h1>
        </header>

        <div className={styles.wikipediaContent}>
          <section>
            <h2>Video Collection</h2>
            <p>Discover engaging video content.</p>

            <div className="language-grid">
              <div className="language-card">
                <div className="language-name">Entertainment</div>
                <div className="language-articles">Fun and entertaining videos</div>
              </div>
              <div className="language-card">
                <div className="language-name">Educational</div>
                <div className="language-articles">Learning and tutorials</div>
              </div>
              <div className="language-card">
                <div className="language-name">Gaming</div>
                <div className="language-articles">Gaming clips and streams</div>
              </div>
              <div className="language-card">
                <div className="language-name">Sports</div>
                <div className="language-articles">Sports highlights</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Videos;
