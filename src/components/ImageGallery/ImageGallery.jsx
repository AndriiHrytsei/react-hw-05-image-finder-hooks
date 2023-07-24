import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';
import styles from './ImageGallery.module.css';
import LoadMore from 'components/LoadMore/LoadMore';


export default function ImageGallery({ query }) {
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [perPage, setPerPage] = useState(0)

  const loadPhotos = (q) => {
    setStatus('pending')
    setPerPage(12)
    fetch(
      `https://pixabay.com/api/?q=${q}&key=35594812-0318ae570b601c4a3427f19fb&image_type=photo&orientation=horizontal&per_page=200`
    )
      .then(response => {
        if (response.ok){
          return response.json()
        }
        return Promise.reject(new Error('Image not found'))
      })
      .then(data => {
        setPhotos([...data.hits])
        setStatus('resolved')
        setError(false)
      })
      .catch(error => {
        setError(error.message)
        setStatus('rejected')
      })
  }
  useEffect(() => {
    if (query.trim() !== ''){
      loadPhotos(query)
    }
  }, [query])

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
              <LoadMore inreamentFunc={() => setPerPage(perPage => perPage + 12)} />
            )}
          </>
        ) : (
          <p>Nothing here...</p>
        )}
      </>
    );   
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired
}