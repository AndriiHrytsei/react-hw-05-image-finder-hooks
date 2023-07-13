import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ imgSrc, imgTag }) => (
  <div className={styles.Overlay}>
    <img src={imgSrc} alt={imgTag} className={styles.Modal} />
  </div>
);

export default Modal;
