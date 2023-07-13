import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ImageGallery.module.css';
import LoadMore from 'components/LoadMore/LoadMore';

export default class ImageGallery extends Component {
  state = {
    photos: [],
    error: null,
    status: 'idle',
    perPage: 0,
  };

  loadPhotos = () => {
    this.setState({ status: 'pending', perPage: 12 });
    fetch(
      `https://pixabay.com/api/?q=${this.props.query}&key=35594812-0318ae570b601c4a3427f19fb&image_type=photo&orientation=horizontal&per_page=200`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Images not found'));
      })
      .then(photos => {
        this.setState({
          photos: [...photos.hits],
          status: 'resolved',
          error: false,
        });
      })
      .catch(error =>
        this.setState({
          error: error.message,
          status: 'rejected',
        })
      );
  };

  handleLoadMore = () => {
    this.setState({
      perPage: this.state.perPage + 12,
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.query !== this.props.query) {
      this.loadPhotos();
    }
  };

  render() {
    const { photos, error, status, perPage } = this.state;
    if (status === 'pending') {
      return (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#000"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      );
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          {photos.length > 0 ? (
            <>
              <ul className={styles.ImageGallery}>
                {photos
                  .slice(0, perPage)
                  .map(({ id, webformatURL, tags, largeImageURL }) => (
                    <ImageGalleryItem
                      key={id}
                      imageLink={webformatURL}
                      imageTags={tags}
                      bigImageLink={largeImageURL}
                    />
                  ))}
              </ul>
              {photos.length >= 12 && (
                <LoadMore inreamentFunc={this.handleLoadMore} />
              )}
            </>
          ) : (
            <p>Nothing here...</p>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired
}