import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoadingForm, formRef}) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    function changeNameInput(e) {
        setName(e.target.value)
    }

    function changeDescriptionInput(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
      } 

    React.useEffect(() => {
        setName(currentUser.name  || '');
        setDescription(currentUser.about || '');
      }, [currentUser, isOpen]);   

    return (
        <PopupWithForm
        name="form-author"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        buttonText = "Сохранить"
        buttonLoadingText="Сохранение..."
        onSubmit={handleSubmit}
        isLoadingForm={isLoadingForm}
        formRef = {formRef}
      >
        <>
          <input className="form__input form__input_content_fullname" id="input-name" type="text" name="author-fullname"
            placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={changeNameInput} required />
          <span className="form__input-error input-name-error"></span>
          <input className="form__input form__input_content_job" id="input-job" type="text" name="author-job"
            placeholder="Вид деятельности" minLength="2" maxLength="200" value={description} onChange={changeDescriptionInput} required />
          <span className="form__input-error input-job-error"></span>
        </>
      </PopupWithForm>
    )
}

export default EditProfilePopup