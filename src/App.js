import React, { useEffect, useState, useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

import { CartContext } from './context/CartContext';
import Card from './components/Card';
import Header from './components/Header';
import CartIcon from './components/CartIcon';
import Cart from './components/Cart';
import ErrorBoundary from './components/ErrorBoundary';
// import Backdrop from './components/Backdrop';

// setup the client with the API url
const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
});

function App() {
  // declare necessary state using hooks
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);
  const [currency, setCurrency] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState(null);

  const [cartItems, setCartItems] = useContext(CartContext);
  // load products on initial mount/render
  useEffect(() => {
    /**
     * am using promise  here
     * though we can use async/await with try/catch
     * we can also write a custom hook to make http calls
     */
    client
      .query({
        query: gql`
          {
            products {
              id
              image_url
              title
              price(currency: USD)
            }
          }
        `,
      })
      .then((result) => {
        setProducts(result.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        /**
         * for now am grabbing error as an object
         * my assumption is it has message property in it
         */
        setErrorInfo(err);
        setIsLoading(false);
      });

    // load currency
    client
      .query({
        query: gql`
          {
            currency
          }
        `,
      })
      .then((result) => {
        const { currency } = result.data;
        setCurrency(currency);
        // pick the first element in array
        setCurrentCurrency(currency[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        /**
         * for now am grabbing error as an object
         * my assumption is it has message property in it
         */
        setErrorInfo(err);
        setIsLoading(false);
      });
  }, []);

  const onCartToggle = () => {
    setShowCart(!showCart);
  };

  const onCloseCart = () => {
    setShowCart(false);
  };

  // let backdrop;
  // if (showCart) {
  //   backdrop = <Backdrop onClick={onCloseCart} />;
  // }

  const onAddToCart = (product) => {
    setShowCart(true);
    if (cartItems.length) {
      const index = cartItems.findIndex((item) => item.id === product.id);
      if (index > -1) {
        // increment quantity
        const newArray = cartItems.slice();
        newArray.forEach((item) => {
          if (item.id === product.id) {
            item['quantity'] += 1;
          }
        });
        setCartItems(newArray);
      } else {
        // add to cart
        const newItem = {
          ...product,
          quantity: 1,
        };
        setCartItems([...cartItems, newItem]);
      }
    } else {
      // first cart item
      const newItem = {
        ...product,
        quantity: 1,
      };
      setCartItems([newItem]);
    }
    // counter
    setCartCount(cartItems.length + 1);
  };

  const onCurrencyChange = (event) => {
    setCurrentCurrency(event.target.value);
  };

  // re-load prices when currency changes
  useEffect(() => {
    if (currentCurrency) {
      client
        .query({
          query: gql`
        {
          products {
            id
            image_url
            title
            price(currency: ${currentCurrency})
          }
        }
      `,
        })
        .then((result) => {
          setProducts(result.data.products);
          setIsLoading(false);
        })
        .catch((err) => {
          /**
           * for now am grabbing error as an object
           * my assumption is it has message property in it
           */
          setErrorInfo(err);
          setIsLoading(false);
        });
    }
  }, [currentCurrency]);

  /**
   * we can make use ternary operator
   * but i find this more readable
   */
  const ErrorComponent = <div>An error occurred :(</div>;
  /**
   * trying to keep it simple here
   * we can use more elegant way to show spinner
   */
  const LoadingComponent = <div>Loading...</div>;

  if (isLoading) return LoadingComponent;
  if (errorInfo) return ErrorComponent;
  return (
    <ErrorBoundary>
      <Header>
        <CartIcon onClick={onCartToggle} itemCount={cartCount} />
      </Header>
      <Cart
        cartItems={cartItems}
        showCart={showCart}
        onClick={onCloseCart}
        currencyList={currency}
        onCurrencyChange={onCurrencyChange}
        currency={currentCurrency}
      />
      {/* disabled backdrop to allow user add more items when cart drawer is open */}
      {/* {backdrop} */}
      <div className='wrapper'>
        {products &&
          products.map((product) => {
            return (
              <Card
                currency={currentCurrency}
                onClick={() => {
                  onAddToCart(product);
                }}
                key={product.id}
                propduct={product}
              />
            );
          })}
      </div>
    </ErrorBoundary>
  );
}

export default App;
