import React from 'react';

const ImageGalleryItem = ({ imageId, imageLink, imageTags }) => (
  <li className="gallery-item" key={imageId}>
    <img src={imageLink} alt={imageTags} width={250} />
  </li>
);

export default ImageGalleryItem;
