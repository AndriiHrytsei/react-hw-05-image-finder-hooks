// import React, { Component } from 'react';
import styles from './LoadMore.module.css';
import React from 'react'
import PropTypes from 'prop-types';

const LoadMore = ({ inreamentFunc }) => (
  <button className={styles.Button} type="button" onClick={inreamentFunc}>
    Load more
  </button>
)

LoadMore.propTypes = {
  inreamentFunc: PropTypes.func.isRequired
}

export default LoadMore