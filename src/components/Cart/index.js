import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../context/CartContext';
import Header from '../Header';
import CloseCart from '../../img/arrow_back.png';
import './style.css';
import Select from '../Select';
import CartItem from '../CartItem';
import Button from '../Button';

const Cart = ({
  showCart,
  onClick,
  currencyList /*, cartItems*/,
  onCurrencyChange,
  currency,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [cartItems, setCartItems] = useContext(CartContext);
  const cartTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const cartClass = showCart ? 'cart open' : 'cart';
  return (
    <div className={cartClass}>
      <Header>
        <img
          onClick={onClick}
          className='close-cart'
          src={CloseCart}
          alt='close cart'
        />
        <span className='your-cart'>Your Cart</span>
        <div className='currency'>
          <Select onChange={onCurrencyChange}>
            {currencyList &&
              currencyList.map((money) => {
                return <option key={money}>{money}</option>;
              })}
          </Select>
        </div>
      </Header>
      <div className='cart-body'>
        {cartItems && cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem currency={currency} key={item.id} item={item} />;
          })
        ) : (
          <p style={{ textAlign: 'center' }}>No items</p>
        )}
      </div>
      <hr />
      <div className='sub-total'>
        <div className='total-caption'>Sub Total</div>
        <div className='total-amount'>
          {currency} {cartTotal}
        </div>
      </div>
      <div className='checkout-button'>
        <Button
          onClick={() => {
            /*checkout logic */
          }}
          caption='PROCEED TO CHECKOUT'
        />
      </div>
    </div>
  );
};

Cart.propTypes = {
  showCart: PropTypes.bool,
  onClick: PropTypes.func,
  currencyList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cartItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onCurrencyChange: PropTypes.func,
  currency: PropTypes.string,
};

export default Cart;
