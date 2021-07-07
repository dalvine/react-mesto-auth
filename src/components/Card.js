import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    const cardDeleteButtonClassName = (
        `place__delete ${isOwn ? 'place__delete_visible' : 'place__delete_hidden'}`
    )
    const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }


    return (
        <li className="place">
            <img className="place__photo" src={card.link} alt={card.name} onClick={handleClick} />
            <h2 className="place__title">{card.name}</h2>
            <div className="place__like-container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <p className="place__like-count">{card.likes.length}</p>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </li>
    )
}

export default Card