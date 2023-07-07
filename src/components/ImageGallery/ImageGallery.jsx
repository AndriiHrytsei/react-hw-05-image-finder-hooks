import React, { Component } from 'react'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'

export default class ImageGallery extends Component {
  state = {
    photos: [],
    error: null,
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.query !== this.props.query){
      fetch(`https://pixabay.com/api/?q=${this.props.query}&page=1&key=35594812-0318ae570b601c4a3427f19fb&image_type=photo&orientation=horizontal&per_page=20`)
        .then(response => response.json())
        .then(photos => {
          this.setState({photos: photos.hits})
        })
    }
  }
  render() {
    const { photos } = this.state
    return (
      <ul>
        {photos.map(photo => (
          <ImageGalleryItem imageId={photo.id} imageLink={photo.webformatURL} imageTags={photo.tags}/>
        ))}
      </ul>
    )
  }
}