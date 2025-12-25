import React, { useState, useEffect } from 'react';
import styles from './content.module.css';

const debug = false;

function ImageGallery({ image }) {
  const [images, setImages] = useState([]);

  const extractImageUrls = async (data) => {
    let imageUrls = [];
    imageUrls = await Object.keys(data).map((key) => {
      let item = data[key];
      let imageUrl = ""
      if (item.status === "valid") {
        imageUrl = item?.s?.u;
        imageUrl = imageUrl.replaceAll('amp;', '');
      }
      return imageUrl;
    });

    // console.log(imageUrls);
    return imageUrls;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.reddit.com/api/info.json?url=${image.url}`);
        let data = await res.json();

        let media_metadata = data.data?.children[0].data.media_metadata;

        // Data is buried deeper.
        if (!media_metadata) {
          // here data can either be readily available or not.
          data = data.data?.children[0].data.crosspost_parent_list;
          if (data) {
            media_metadata = data[0]?.media_metadata;  // children is a duplicate of original post for each image in gallery
            let imageUrls = await extractImageUrls(media_metadata);
            setImages(imageUrls);
          }
        } else {
          let imageUrls = await extractImageUrls(media_metadata);
          setImages(imageUrls);
        }

      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, [])

  const renderBasicImage = (imageUrl) => {
    return <img className={`${styles.image} ${styles.responsiveImage}`} src={imageUrl} alt={imageUrl} />
  }

  return <div className={styles.contentContainer}>
    {debug && <p>Image Gallery Image: {JSON.stringify(image)}</p>}
    <a href={image.postUrl} className={styles.link}>{image.score} {image.title}</a>
    <p><b>{`r/${image.subreddit}`}</b> {image.author}</p>
    {images && images?.map((imageUrl, i) => <div key={i}>{renderBasicImage(imageUrl)}</div>)}
  </div>

}

export default ImageGallery;
