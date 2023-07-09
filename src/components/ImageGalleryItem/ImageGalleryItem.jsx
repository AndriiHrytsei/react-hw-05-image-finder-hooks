import React from 'react';
import styles from './ImageGalleryItem.module.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageGalleryItem = ({ imageLink, imageTags }) => (
  <li className={styles.ImageGalleryItem}>
    <LazyLoadImage src={imageLink} alt={imageTags} className={styles.ImageGalleryItemImage}/>
  </li>
);

export default ImageGalleryItem;
