import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Header = ({ children }) => {
  return <div className="header">{children}</div>;
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Header;
