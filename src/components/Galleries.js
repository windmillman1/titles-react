import React from 'react';
import styles from '../app.module.css';

function Galleries() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wikipediaContainer}>
        <header className={styles.wikipediaHeader}>
          <h1 className={styles.wikipediaTitle}>Galleries</h1>
        </header>

        <div className={styles.wikipediaContent}>
          <section>
            <h2>Gallery Collections</h2>

            <div className="language-grid">
              <div className="language-card">
                <div className="language-name">Photography</div>
                <div className="language-articles">Photo series and albums</div>
              </div>
              <div className="language-card">
                <div className="language-name">Travel</div>
                <div className="language-articles">Travel photo collections</div>
              </div>
              <div className="language-card">
                <div className="language-name">DIY Projects</div>
                <div className="language-articles">Step-by-step project galleries</div>
              </div>
              <div className="language-card">
                <div className="language-name">Before/After</div>
                <div className="language-articles">Transformation galleries</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Galleries;
