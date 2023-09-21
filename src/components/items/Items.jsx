import style from './Items.module.scss';
import { useState } from 'react';

const Items = ({ itemsState, setItemsState, activeItemState, setActiveItemState }) => {
    const [inputState, setInputState] = useState('');
    const itemExample = {
        id: Date.now(),
        name: inputState,
        comments: [],
    };

    const clickOnDeleteButton = (event, deleteId) => {
        event.stopPropagation();
        const filteredItems = itemsState.filter(item => item.id !== deleteId);
        setItemsState(filteredItems);
        setActiveItemState(itemsState.length ? filteredItems[filteredItems.length - 1] : null)
        localStorage.setItem('items', JSON.stringify(filteredItems));
        localStorage.setItem('activeItem', JSON.stringify(filteredItems[filteredItems.length - 1]));
    };

    const addItem = (event) => {
        event.preventDefault();

        if (!inputState.trim().length) {
            alert('Заповніть поле назви айтему');
            setInputState('');
            return false;
        }

        setItemsState([...itemsState, itemExample]);
        localStorage.setItem('items', JSON.stringify([...itemsState, itemExample]));
        setInputState('');

        if (!activeItemState) {
            setActiveItemState(itemExample)
            localStorage.setItem('activeItem', JSON.stringify(itemExample));
        }
    };

    const clickOnItem = (event, item) => {
        event.stopPropagation();
        setActiveItemState(item);
        localStorage.setItem('activeItem', JSON.stringify(item));
    };

    return (
        <div className={style.itemsWrapper}>
            <h1 className={style.itemsWrapper_title}>Items</h1>
            <form onSubmit={addItem} className={style.itemsWrapper_form}>
                <input
                    type="text"
                    value={inputState}
                    onChange={(event) => setInputState(event.target.value)}
                    className={style.itemsWrapper_input}
                    placeholder="Type name here..."
                />
                <button className={style.itemsWrapper_button}>Add New</button>
            </form>
            {itemsState?.length ? (
                <ul className={style.itemsWrapper_list}>
                    {itemsState.map(item => (
                        <li
                            key={item.id}
                            onClick={(event) => clickOnItem(event, item)}
                            className={`${style.itemWrapper} ${activeItemState?.id === item.id
                                ? style.active
                                : ''}`
                            }
                        >
                            {item.name}
                            <span className={style.itemWrapper_count}>
                                {item.comments?.length}
                            </span>
                            <button
                                className={style.itemWrapper_button}
                                onClick={(event) => clickOnDeleteButton(event, item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Items;
