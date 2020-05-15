import React from 'react';
import PropTypes from 'prop-types';

import CartImg from '../../img/shopping_icon.png';

import './style.css';

const CartIcon = ({ onClick, itemCount }) => {
  return (
    <div onClick={onClick} className="cart-icon-wrapper">
      <span className="cart-counter">{itemCount}</span>
      <img className="cart-icon" src={CartImg} alt="cart-icon" />
    </div>
  );
};

CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  itemCount: PropTypes.number,
};

export default CartIcon;
