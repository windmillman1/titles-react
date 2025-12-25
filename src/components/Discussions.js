import React from 'react';
import styles from '../app.module.css';

function Discussions() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wikipediaContainer}>
        <header className={styles.wikipediaHeader}>
          <h1 className={styles.wikipediaTitle}>Discussions</h1>
        </header>

        <div className={styles.wikipediaContent}>
          <section>
            <h2>Discussion Topics</h2>
            <p>Explore thought-provoking discussions.</p>

            <div className="language-grid">
              <div className="language-card">
                <div className="language-name">Stories</div>
                <div className="language-articles">Personal stories and tales</div>
              </div>
              <div className="language-card">
                <div className="language-name">Advice</div>
                <div className="language-articles">Life advice and tips</div>
              </div>
              <div className="language-card">
                <div className="language-name">Debates</div>
                <div className="language-articles">Discussions and debates</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Discussions;
