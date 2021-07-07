import Card from '../components/Card.js'
import {
  inputEditNameAuthor, inputEditJobAuthor, placeTemplate
} from './constants.js'
import { userInfo, api, popupWithConfirm, popupWithImage } from '../pages/index.js'

export { fillFormAuthor, createCard, getMessage }


const fillFormAuthor = () => {
  const userData = userInfo.getUserInfo()
  inputEditNameAuthor.value = userData.name
  inputEditJobAuthor.value = userData.about
}

const createCard = (data) => {
  return new Card(data,
    placeTemplate,
    () => {
      popupWithImage.open(data)
    }, //handleCardClick
    (id, card) => {
      popupWithConfirm.open(id, card)
    }, //handleDelete
    (likesArray) => {
      const myUser = userInfo.getUserInfo()
      return likesArray.some(user => myUser._id === user._id)
    }, //checkLike
    (id, like, countLike) => {
      api.addLike(id)
        .then((result) => {
          like.classList.add('place__like_active')
          countLike.textContent = result.likes.length;
        })
        .catch(err => console.log(err))
    }, //addLike
    (id, like, countLike) => {
      api.removeLike(id)
        .then((result) => {
          like.classList.remove('place__like_active')
          countLike.textContent = result.likes.length;
        })
    }, //removeLike
    (owner) => {
      return userInfo.getUserInfo()._id === owner._id
    } // checkCardOwnership
  )
}

const getMessage = err => {
  err.then(answer => alert(answer.message))
} //get message from reject
