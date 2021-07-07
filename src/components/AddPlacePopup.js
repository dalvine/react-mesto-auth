import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoadingForm, formRef}) {
    const [link, setLink] = React.useState('')
    const [name, setName] = React.useState('')

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({link, name});
    }

    function changeInputName(e) {
        setName(e.target.value)
    }

    function changeInputLink(e) {
        setLink(e.target.value)
    }

    function close() {
        setName('')
        setLink('')
        onClose()
    }

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            isOpen={isOpen}
            onClose={close}
            buttonText="Создать"
            buttonLoadingText="Сохранение..."
            onSubmit={handleSubmit}
            isLoadingForm={isLoadingForm}
            formRef = {formRef}
        >
            <>
            <input onChange={changeInputName} value={name} className="form__input form__input_content_name-place" id="input-name-place" type="text" name="namePlace"
              placeholder="Название" minLength="2"  maxLength="30" required/>
            <span className="form__input-error input-name-place-error"></span>
            <input onChange={changeInputLink} value={link} className="form__input form__input_content_link-image" id="input-url-place" type="url" name="urlPlace"
              placeholder="Ссылка на картинку" required />
            <span className="form__input-error input-url-place-error"></span>
          </>
        </PopupWithForm>
    )
}

export default AddPlacePopup