import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ImageGallery.module.css';
import LoadMore from 'components/LoadMore/LoadMore';

export default class ImageGallery extends Component {
  state = {
    photos: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  
  loadUsers = () => {
    this.setState({ status: 'pending' });
    fetch(
      `https://pixabay.com/api/?q=${this.props.query}&key=35594812-0318ae570b601c4a3427f19fb&image_type=photo&orientation=horizontal&per_page=20&page=${this.state.page}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Images not found'));
      })
      .then(photos => {
        this.setState(prevState => {
          return {
            photos: [...prevState.photos, ...photos.hits],
            status: 'resolved',
            error: false,
          };
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
      page: this.state.page + 1,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.loadUsers();
    }
  };
  render() {
    const { photos, error, status } = this.state;
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
                {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
                  <ImageGalleryItem
                    key={id}
                    imageLink={webformatURL}
                    imageTags={tags}
                    bigImageLink={largeImageURL}
                  />
                ))}
              </ul>
              {photos.length >= 20 && (
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
