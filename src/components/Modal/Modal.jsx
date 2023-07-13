import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ imgSrc, imgTag }) => (
  <div className={styles.Overlay} data-name='backdrop'>
    <img src={imgSrc} alt={imgTag} className={styles.Modal} />
  </div>
);

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgTag: PropTypes.string
}

export default Modal;
