import ImageGallery from './ImageGallery';
import styles from './content.module.css';

const debug = false;

const renderType = (image) => {
  // find out if image is simple image or gif
  if (image.url) {
    if (image.url.slice(-4, image.url.length) === "gifv") {
      image.gifUrl = image.url; // Treat as gifurl
    }
  }

  if (image.gfyCatUrl) {
    return <div className={styles.contentContainer} style={{ width: 1200, height: 800, paddingBottom: 100 }}>
      {debug && <p>Gfycat: {JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <iframe src={image.gfyCatUrl} title={image.title} className={styles.responsiveIframe} frameBorder='0' scrolling='no' allowFullScreen>
      </iframe>
    </div>
  } else if (image.gifEmbedUrl) {
    return <div className={styles.contentContainer} style={{ width: 1200, height: 800, paddingBottom: 100 }}>
      {debug && <p>Redgif: {JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <iframe src={image.gifEmbedUrl} title={image.title} className={styles.responsiveIframe} frameBorder='0' scrolling='no' allowFullScreen>
      </iframe>
    </div>
  } else if (image.gifUrl) {
    let url = image.gifUrl.replace('.gifv', '.mp4');  // gifv is not a real file format, should be mp4
    return <div className={styles.contentContainer} style={{ paddingBottom: 100 }}>
      {debug && <p>Basic or Embedded Gif: {JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <video loop autoPlay controls className={styles.responsiveVideo}>
        <source src={url}></source>
      </video>
    </div>
  } else if (!image.url || (image.selftext === "[deleted]" || image.selftext === "[removed]")) {
    // True deleted post
    return
  } else if (image.selftext && image.selftext !== "[deleted]" && image.selfText !== "[removed]" && image.selfText !== "[ Removed by reddit in response to a copyright notice. ]") {
    return <div className={styles.contentContainer}>
      {debug && <p>{JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <p>{image.selftext}</p>
    </div>
  } else if (image.is_gallery) {
    // still uses url (url_overriden_by_destination) but creates iframe instead of img tag
    return <ImageGallery image={image} />
  } else if (!image.url && image.thumbnail) {
    // Should be an image, but image at url no longer exists. Use thumbnail image instead
    return <div className={styles.contentContainer}>
      {debug && <p>Thumbnail Image: {JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <img className={`${styles.image} ${styles.responsiveImage}`} src={image.thumbnail} alt={image.title}></img>
    </div>
  } else {
    return <div className={styles.contentContainer}>
      {debug && <p>Normal Image: {JSON.stringify(image)}</p>}
      <a href={image.postUrl} className={styles.link}>{image.score} | {image.title}</a>
      <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
      <img className={`${styles.image} ${styles.responsiveImage}`} src={image.url} alt={image.title}></img>
    </div>
  }
}

// add className to self
function Image({ image }) {
  const fillOnClick = (e) => {
    e.currentTarget.classList.toggle(styles.fillScreen);
  };

  return <div className={styles.contentContainer} onClick={fillOnClick}>
    <hr></hr>
    {renderType(image)}
  </div>
}

export default Image;
