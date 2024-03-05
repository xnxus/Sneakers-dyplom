import React, { Fragment } from 'react';
import {} from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

import AppContext from '../../context';

function Card({
  id,
  imageUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setisFavorite] = React.useState(favorited);
  const objItem = { id, parentId: id, imageUrl, title, price };
  console.log(objItem);

  const onClickPlus = () => {
    onPlus(objItem);
  };

  const onClickFavorite = () => {
    setisFavorite(!isFavorite);
    onFavorite(objItem);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={240}
          height={240}
          viewBox="0 0 240 240"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="30" rx="10" ry="10" width="170" height="90" />
          <rect x="0" y="150" rx="4" ry="4" width="150" height="15" />
          <rect x="0" y="170" rx="4" ry="4" width="95" height="15" />
          <rect x="0" y="210" rx="4" ry="4" width="70" height="30" />
          <rect x="135" y="205" rx="4" ry="4" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                src={isFavorite ? 'img/heard-liked.svg' : 'img/heard-unliked.svg'}
                alt="Unliked"
                onClick={onClickFavorite}
              />
            </div>
          )}
          <img src={imageUrl} alt="sneakers" width="100%" height={130} />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price} UAH</b>
            </div>
            {onPlus && (
              <img
                onClick={onClickPlus}
                className={styles.buttonPlus}
                src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                width={32}
                height={32}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
