import React, { Component } from 'react';
import styles from './LoadMore.module.css';

export default class LoadMore extends Component {
  state = {
    photosPerPage: 20
  }
  onClick = () => {
    this.setState({
      photosPerPage: this.state.photosPerPage + 20,
    })
    this.props.perPage(this.state.photosPerPage)
  }

  render() {
    return (
      <button className={styles.Button} type="button" onClick={this.onClick}>
        Load more
      </button>
    )
  }
}
