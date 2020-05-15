import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import Button from '../Button';

const Card = ({ propduct, onClick, currency }) => {
  return (
    <div className="card">
      <img src={propduct.image_url} alt={propduct.title} className="image" />
      <p>{propduct.title}</p>
      <p>
        From {currency} {propduct.price}
      </p>
      <Button onClick={onClick} caption="Add to Cart" />
    </div>
  );
};

Card.propTypes = {
  propduct: PropTypes.object,
  onClick: PropTypes.func,
  currency: PropTypes.string,
};

export default Card;
