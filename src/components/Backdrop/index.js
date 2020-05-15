import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Backdrop = ({ onClick }) => {
  return <div onClick={onClick} className="backdrop" />;
};

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default Backdrop;
