import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import 'macro-css';

import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://65e3acdb88c4088649f5fd64.mockapi.io/cart'),
          axios.get('https://65c8fda2a4fbc162e11279a8.mockapi.io/favorites'),
          axios.get('https://65e3acdb88c4088649f5fd64.mockapi.io/items'),
        ]);

        setIsLoading(false); 
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Failed to fetch data');
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onAddtoCarts = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://65e3acdb88c4088649f5fd64.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://65e3acdb88c4088649f5fd64.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Error when adding to cart');
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://65e3acdb88c4088649f5fd64.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Error when deleting from trash');
      console.log(error);
    }
  };

  const onAddtoFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://65c8fda2a4fbc162e11279a8.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://65c8fda2a4fbc162e11279a8.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Failed to add to favorites');
      console.log(error);
    }
  };

  const onChangeValueInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddtoFavorites,
        onAddtoCarts,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeValueInput={onChangeValueInput}
                onAddtoCarts={onAddtoCarts}
                onAddtoFavorites={onAddtoFavorites}
                isLoading={isLoading}
              />
            }
          />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
