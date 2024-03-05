import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
// import AppContext from '../context';

function Orders() {
  // const { onAddtoFavorites, onAddtoCarts } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://65c8fda2a4fbc162e11279a8.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert('Failed to add to orders');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="contentHeading">Orders</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
