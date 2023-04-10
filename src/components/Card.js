import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeletClick() {
        props.onCardDelete(props.card)
    }
    
    return(
        <div className="element">
            <button className="element__img-popup" onClick={handleClick}>
                <img className="element__img" alt={props.name} src={props.link}/>
            </button>
            {isOwn && <button type="button" className="element__delete" id="deletButton" onClick={handleDeletClick} ></button>}
            <div className="element__name">
                <h2 className="element__paragraph">{props.name}</h2>
                <div className="element__like-zone">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__counter">{props.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
export default Card