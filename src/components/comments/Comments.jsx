import style from './Comments.module.scss';
import { useState } from 'react';

const Comments = ({ itemsState, setItemsState, activeItemState, setActiveItemState }) => {
    const [textAreaText, setTextAreaText] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const commentExample = {
        id: `${activeItemState?.id}-${activeItemState?.comments?.length}`,
        body: textAreaText,
        color: selectedColor,
    };

    const handliClickAddComment = (event) => {
        event.preventDefault();

        if (!textAreaText.trim().length) {
            setTextAreaText('');
            setSelectedColor('#000000');
            alert('Заповніть поле коментаря')
            return false;
        }

        const newItems = itemsState.map(item => {
            if(item.id === activeItemState.id) {
                setActiveItemState({...activeItemState, comments: [...activeItemState.comments, commentExample]});
                localStorage.setItem('activeItem', JSON.stringify({...activeItemState, comments: [...activeItemState.comments, commentExample]}));
                return {...activeItemState, comments: [...activeItemState.comments, commentExample]};
            } else {
                return item;
            }
        });

        setItemsState(newItems);
        localStorage.setItem('items', JSON.stringify(newItems));
        setTextAreaText('');
        setSelectedColor('#000000')
    }

    return (
        <div className={style.commentsWrapper}>
            <h1 className={style.commentsWrapper_title}>Comments # {activeItemState?.id}</h1>
            <div className={style.commentsWrapper_comments}>
                {activeItemState?.comments?.map(item => (
                    <div key={item.id} className={style.commentsWrapper_commentCard}>
                        <div className={style.commentsWrapper_commetColor} style={{backgroundColor: `${item.color}`}}/>
                        <div className={style.commentsWrapper_commetBody}>
                            {item.body}
                        </div>
                    </div>
                ))}
            </div>
            <form className={style.commentsWrapper_form} onSubmit={handliClickAddComment}>
                <input
                    type="color"
                    value={selectedColor}
                    onChange={event => setSelectedColor(event.target.value)}
                    className={style.commentsWrapper_colorSelection}
                />
                <textarea
                    value={textAreaText}
                    onChange={(e) => setTextAreaText(e.target.value)}
                    className={style.commentsWrapper_textarea}
                />
                <button className={style.commentsWrapper_button}>Add New</button>
            </form>
        </div>
    );
};

export default Comments;