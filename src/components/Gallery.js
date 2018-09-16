import React from 'react';

function Gallery(props) {
  return (
    <div className="gallery">
      {props.children}
    </div>
  );
}

export default Gallery;
