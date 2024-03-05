import Card from '../components/Card';
import React from 'react';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeValueInput,
  onAddtoCarts,
  onAddtoFavorites,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddtoCarts(obj)}
        onFavorite={(obj) => onAddtoFavorites(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="contentHeading">
        {searchValue ? `Search by filter: ${searchValue}` : 'All sneakers'}
        </h1>
        <div className="search-block d-flex align-center">
          <img className="ml-10" src="img/search.svg" alt="search" width={14} height={14} />
          {searchValue && (
            <img
              src="img/btn-remove.svg"
              onClick={() => setSearchValue('')}
              alt=""
              className="clear cu-p"
            />
          )}
          <input onChange={onChangeValueInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
