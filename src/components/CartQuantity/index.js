import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CartQuantity = ({ onIncrement, onDecrement, value, onChange }) => {
  return (
    <div className="cart-quantity">
      <button type="button" className="decrement" onClick={onDecrement}>
        -
      </button>
      <input
        type="text"
        className="quantity"
        onChange={onChange}
        value={value}
      />
      <button type="button" className="increment" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

CartQuantity.propTypes = {
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default CartQuantity;
