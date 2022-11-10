import React from 'react';
import '../../styles/styles.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return <ImageGalleryItem item={image} onSelect={toggleModal} />;
      })}
    </ul>
  );
};
