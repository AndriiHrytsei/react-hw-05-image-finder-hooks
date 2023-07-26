import React, { useEffect, useState } from 'react';
import styles from './ImageGalleryItem.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  imageLink,
  imageTags,
  bigImageLink,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = e => {
    if (e.target.dataset.name === 'backdrop') {
      setVisible(false);
    }
  };

  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <LazyLoadImage
          src={imageLink}
          alt={imageTags}
          className={styles.ImageGalleryItemImage}
          onClick={() => handleOpenModal()}
        />
      </li>
      {visible && <Modal imgSrc={bigImageLink} imgTag={imageTags} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageTags: PropTypes.string,
  bigImageLink: PropTypes.string.isRequired,
};
