import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../context/CartContext';
import './style.css';
import CartQuantity from '../CartQuantity';

const CartItem = ({ item, currency }) => {
  const [cartItems, setCartItems] = useContext(CartContext);
  // TODO
  const onRemoveItem = () => {
    const newArray = cartItems.slice();
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    // if (index > -1) {
    setCartItems(newArray.splice(index, 1));
    // }
  };

  // decrement
  const onDecrement = () => {
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    if (index > -1) {
      const newArray = cartItems.slice();
      newArray.forEach((elem) => {
        if (elem.id === item.id) {
          if (elem['quantity'] === 1) {
            // remove
            setCartItems(newArray.splice(index, 1));
          } else {
            // decrement quantity
            elem['quantity'] -= 1;
          }
        }
      });
      setCartItems(newArray);
    }
  };

  // increment
  const onIncrement = () => {
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    if (index > -1) {
      const newArray = cartItems.slice();
      newArray.forEach((elem) => {
        if (elem.id === item.id) {
          // increment quantity
          elem['quantity'] += 1;
        }
      });
      setCartItems(newArray);
    }
  };

  return (
    item && (
      <div className='cart-item'>
        {/* onDecrement even-handler will cater for removal */}
        <i
          className='remove-item'
          style={{ display: 'none' }}
          onClick={onRemoveItem}
        >
          X
        </i>
        <p className='cart-title'>{item.title}</p>
        <div style={{ textAlign: 'right' }}>
          <img src={item.image_url} className='cart-image' alt={item.title} />
        </div>
        <div className='quantity-wrapper'>
          <CartQuantity
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            value={item.quantity}
            onChange={() => {
              /* handle manual onChange setState value */
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <span className='cart-item-price'>
              {currency} {item.price}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

CartItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currency: PropTypes.string,
};

export default CartItem;
