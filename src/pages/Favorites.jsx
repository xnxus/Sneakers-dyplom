import Card from '../components/Card';
import React from 'react';

import AppContext from '../context';

function Favorites() {
  const { favorites, onAddtoFavorites } = React.useContext(AppContext);
  console.log(favorites);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="contentHeading">Bookmarks</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={onAddtoFavorites} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
