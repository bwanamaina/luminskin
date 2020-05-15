import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Button = ({ caption, onClick }) => {
  return (
    <button className="button" onClick={onClick} type="button">
      {caption}
    </button>
  );
};

Button.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
