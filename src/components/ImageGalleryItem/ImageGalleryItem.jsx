import React from 'react';
import '../../styles/styles.css';

export const ImageGalleryItem = ({ item, onSelect }) => {
  const { id, webformatURL, tags, largeImageURL } = item;
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => onSelect(largeImageURL)}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};
