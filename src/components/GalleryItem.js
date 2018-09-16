import React from 'react';

function GalleryItem(props) {
  return (
    <div className="gallery__item">
      {props.children}
    </div>
  );
}

export default GalleryItem;
