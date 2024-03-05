import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center flex-column flex justify-center ">
      <img className="mb-20" width={120} src={image} alt="Empty Cart" />
      <h2> {title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow" />
        Go back
      </button>
    </div>
  );
};

export default Info;
