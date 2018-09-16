import React from 'react';

const Card = function(props) {

  const {name, email, picture, location, confirmed} = props.user;

  return (
    <div onClick={props.handler.bind(this, props.user)} className={'card ' + (confirmed ? 'confirmed' : '')}>
      <div className="avatar">
        <img src={picture.large} alt={name.first} />
      </div>
      <div className="info">
          <div className="title">{name.first} {name.last}</div>
          <div className="email"><i className="material-icons">mail</i> <span>{email}</span></div>
          <div className="city"><i className="material-icons">location_city</i> <span>{location.city}</span></div>
      </div>
    </div>
  );
};

export default Card;
