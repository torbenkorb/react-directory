import React from 'react';
import Card from './Card';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';

function EmployeeList(props) {
  return (
    <Gallery>
      {props.users.map((user, index) => (
        <GalleryItem key={index}>
          <Card handler={props.openDialog} user={user} />
        </GalleryItem>
      ))}
    </Gallery>
  );
}

export default EmployeeList;
