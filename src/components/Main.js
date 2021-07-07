import React from 'react'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';
import Loader from './Loader'
import Footer from './Footer'


function Main({ onEditAvatar, onEditProfile, onAddPlace,
    handleCardClick, cards, onCardLike, onCardDelete, isLoading }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Loader isLoading={isLoading} />
            <main className={`main ${isLoading ? "main_hidden" : null}`}>
                <section className="profile">
                    <div className="author">
                        <div className="author__avatar">
                            <img src={currentUser.avatar} alt="Аватарка автора" className="author__avatar-image" />
                            <div className="author__avatar-layer" onClick={onEditAvatar}></div>
                        </div>
                        <h1 className="author__fullname">{currentUser.name}</h1>
                        <p className="author__job">{currentUser.about}</p>
                        <button type="button" className="author__button-edit" onClick={onEditProfile}></button>
                    </div>
                    <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
                </section>
                <section className="places">
                    <ul className="places__list">
                        {
                            cards.map((card) => (
                                <Card
                                    key={card._id}
                                    card={card}
                                    onCardClick={handleCardClick}
                                    onCardLike={onCardLike}
                                    onCardDelete={onCardDelete} />
                            ))
                        }
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Main