import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageLink, imageTags }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={imageLink} alt={imageTags} className={styles.ImageGalleryItemImage} />
  </li>
);

export default ImageGalleryItem;
