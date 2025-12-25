import React from 'react';
import styles from '../app.module.css';

function Images() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wikipediaContainer}>
        <header className={styles.wikipediaHeader}>
          <h1 className={styles.wikipediaTitle}>Images</h1>
        </header>

        <div className={styles.wikipediaContent}>
          <section>
            <h2>Image Gallery</h2>
            <p>Browse through curated image posts</p>

            <div className="language-grid">
              <div className="language-card">
                <div className="language-name">Photos</div>
                <div className="language-articles">Photography and pictures</div>
              </div>
              <div className="language-card">
                <div className="language-name">Art</div>
                <div className="language-articles">Artwork and illustrations</div>
              </div>
              <div className="language-card">
                <div className="language-name">Memes</div>
                <div className="language-articles">Funny images and memes</div>
              </div>
              <div className="language-card">
                <div className="language-name">Nature</div>
                <div className="language-articles">Nature and landscapes</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Images;
