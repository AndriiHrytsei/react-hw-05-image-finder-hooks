/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    isVisible: false,
  };

  componentDidMount = () => {
    window.addEventListener('click', this.handleCloseModal);
  };

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleCloseModal);
  };

  handleOpenModal = () => {
    this.setState({ isVisible: true });
  };

  handleCloseModal = e => {
    if (e.target.dataset.name === 'backdrop') {
      this.setState({ isVisible: false });
    }
  };

  render() {
    const { imageLink, imageTags, bigImageLink } = this.props;
    const { isVisible } = this.state;
    return (
      <>
        <li className={styles.ImageGalleryItem}>
          <LazyLoadImage
            src={imageLink}
            alt={imageTags}
            className={styles.ImageGalleryItemImage}
            onClick={this.handleOpenModal}
          />
        </li>
        {isVisible && <Modal imgSrc={bigImageLink} imgTag={imageTags} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageTags: PropTypes.string,
  bigImageLink: PropTypes.string.isRequired
}