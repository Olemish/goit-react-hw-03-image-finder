import React from 'react';
import '../../styles/styles.css';
export const ButtonLoadMore = ({ onLoadMore }) => {
  return (
    <button className="Button" type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
};
