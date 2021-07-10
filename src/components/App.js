import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import api from '../utils/api'
import Header from './Header'
import Main from './Main'
import Registration from './Registration'
import LogIn from './LogIn'
import ImagePopup from './ImagePopup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import CofirmRemovePlacePopup from './CofirmRemovePlacePopup'
import ProtectedRoute from './ProtectedRoute'
import auth from '../utils/auth'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setСurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingForm, setIsLoadingForm] = React.useState(false)
  const [loggedIn, setloggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const formAddPlaceRef = React.useRef()
  const formEditAvatarRef = React.useRef()
  const formEditProfileRef = React.useRef()


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setSelectedDeleteCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setSelectedDeleteCard({});
    setIsLoadingForm(false)
  }

  function formReset(formRef) {
    formRef.current.reset()
  }

  function handleUpdateUser(data) {
    setIsLoadingForm(true)
    api.editUserInfo(data)
      .then(userData => {
        setСurrentUser(userData)
        closeAllPopups()
        formReset(formEditProfileRef)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(link) {
    setIsLoadingForm(true)
    api.changeAvatar(link)
      .then(() => {
        currentUser.avatar = link
        closeAllPopups()
        formReset(formEditAvatarRef)
      })
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleConfirmDeleteCard(card) {
    setIsLoadingForm(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => !(c._id === card._id)))
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleAddPlace(card) {
    setIsLoadingForm(true)
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
        formReset(formAddPlaceRef)
      })
      .catch(err => console.log(err))
  }

  function checkAuthorization() {
    if (localStorage.getItem('token')) {
      auth.getToken(localStorage.getItem('token'))
        .then(data => {
          setUserEmail(data.data.email)
          setloggedIn(true)
        })
        .catch(() => {
          setloggedIn(false)
        })
    } else {
      setloggedIn(false)
    }
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then(value => {
        setСurrentUser(value)
      })
      .catch(err => console.log(err))
    api.getInitialCards()
      .then(value => {
        setCards(value)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    checkAuthorization()
  }, [loggedIn])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} setLoggedIn={setloggedIn} userEmail={userEmail} />

        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            closeAllPopups={closeAllPopups}
            handleCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            isLoading={isLoading}
            exact
          />
          <Route path="/sign-in">
            {loggedIn ? <Redirect to='/' /> : <LogIn setLoggedIn={setloggedIn} />}
          </Route>
          <Route path="/sign-up">
            {loggedIn ? <Redirect to='/' /> : <Registration />}
          </Route>
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoadingForm={isLoadingForm} formRef={formEditProfileRef} />

        {selectedDeleteCard.name && <CofirmRemovePlacePopup onClose={closeAllPopups} handleConfirmCardDelete={handleConfirmDeleteCard} card={selectedDeleteCard} isLoadingForm={isLoadingForm} />}

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoadingForm={isLoadingForm} formRef={formEditAvatarRef} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlace} isLoadingForm={isLoadingForm} formRef={formAddPlaceRef} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
