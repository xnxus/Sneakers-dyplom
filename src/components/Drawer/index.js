import React from 'react';
import axios from 'axios';

import Info from '../Info';
// import AppContext from '../context';

import { useCart } from '../hooks/useCart';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  // const { cartItems, setCartItems } = React.useContext(AppContext);
  const { cartItems, setCartItems, totalPrice } = useCart();

  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://65c8fda2a4fbc162e11279a8.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        console.log(cartItems);
        await axios.delete(`https://65e3acdb88c4088649f5fd64.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Error when creating an order');
      console.log(error);
    }
    setIsLoading(false);
  };
  console.log(opened);

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
        Cart
          <img
            onClick={onClose}
            src="img/btn-remove.svg"
            alt="Close"
            className="removeBtn cu-p"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column justify-between h100p">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-15 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} UAH.</b>
                  </div>
                  <img
                    src="img/btn-remove.svg"
                    alt="Remove"
                    className="removeBtn"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} UAH.</b>
                </li>
                <li>
                  <span>Tax of 5%.:</span>
                  <div></div>
                  <b>{(totalPrice * 5) / 100} UAH.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
              Place an order
                <img src="img/arrow.svg" alt="" />
              </button>
            </div>
          </div>
        ) : (
          <Info
          title={isOrderComplete ? 'The order is placed!' : 'Cart is empty'}
          description={
            isOrderComplete
              ? `Your order #${orderId} will be courier-delivered shortly.`
              : 'Add at least one pair of sneakers to place an order.'
          }
            image={isOrderComplete ? 'img/complete-order.png' : 'img/empty-cart.jpg'}
          />
          // <div className="cartEmpty d-flex align-center flex-column flex justify-center ">
          //   <img width={120} height={120} src="img/empty-cart.jpg" alt="Empty Cart" />
          //   <h2> Корзина пустая</h2>
          //   <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          //   <button onClick={onClose} className="greenButton">
          //     <img src="img/arrow.svg" alt="Arrow" />
          //     Вернуться назад
          //   </button>
          // </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
