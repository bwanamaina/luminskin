import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Select = ({ children, onChange }) => {
  return (
    <div>
      <select onChange={onChange} className="select">
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default Select;
