import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="">
        <div className="headerLeft d-flex align-center">
          <img className="mr-15" width={40} height={40} src="img/logo.png" alt="Лого" />
          <div className="headerInfo">
            <h3 className="text-uppercase">Yay Sneakers</h3>
            <p className="opacity-5">Find smth for you</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight d-flex">
        <li onClick={props.onClickCart} className="cu-p mr-30">
          <img className="mr-10" src="img/basket.svg" width={18} height={17} alt="Корзина" />
          <span>{totalPrice} UAH</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img src="img/heard.svg" width={20} height={20} alt="Orders" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="img/Union.svg" width={20} height={20} alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
