// import React, { Component } from 'react';
import styles from './LoadMore.module.css';
import React from 'react'

// export default class LoadMore extends Component {
//   render() {
//     return (
//       <button className={styles.Button} type="button" onClick={this.onClick}>
//         Load more
//       </button>
//     )
//   }
// }


const LoadMore = ({ inreamentFunc }) => (
  <button className={styles.Button} type="button" onClick={inreamentFunc}>
    Load more
  </button>
)

export default LoadMore