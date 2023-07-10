// import React, { Component } from 'react';
import styles from './LoadMore.module.css';
import React from 'react'

const LoadMore = ({ inreamentFunc }) => (
  <button className={styles.Button} type="button" onClick={inreamentFunc}>
    Load more
  </button>
)

export default LoadMore