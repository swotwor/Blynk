import style from './App.module.scss';
import Items from './components/items/Items';
import Comments from './components/comments/Comments';
import { useEffect, useState } from 'react';

const App = () => {
  const [itemsState, setItemsState] = useState([]);
  const [activeItemState, setActiveItemState] = useState({});
  const itemsFromStore = JSON.parse(localStorage.getItem('items'));
  let activeItemFromStore;
  const example = {id: '0', name: 'Test', comments: [{id: '0-0', body: 'Test', color: '#000000'}]};

  const isActiveItemsInStore = localStorage.getItem('activeItem')

  if (isActiveItemsInStore !== 'undefined') {
    activeItemFromStore = JSON.parse(localStorage.getItem('activeItem'));
  } 

  useEffect(() => {
    if (!itemsFromStore?.length && !activeItemFromStore) {
      setItemsState([example]);
      setActiveItemState(example);
    } else {
      setItemsState([...itemsFromStore]);
      setActiveItemState(activeItemFromStore);
    }
  }, []);

  return (
      <div className={style.wrapper}>
          <Items
            itemsState={itemsState}
            setItemsState={setItemsState}
            activeItemState={activeItemState}
            setActiveItemState={setActiveItemState}
          />
          <Comments
            itemsState={itemsState}
            setItemsState={setItemsState}
            activeItemState={activeItemState}
            setActiveItemState={setActiveItemState}
          />
      </div>
  );
};

export default App;
