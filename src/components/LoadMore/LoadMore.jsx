import React from 'react';
import styles from './LoadMore.module.css';

const LoadMore = ({ increamentFunct }) => {
  return (
    <button className={styles.Button} type="button" onClick={increamentFunct}>
      Load more
    </button>
  );
};

export default LoadMore;
