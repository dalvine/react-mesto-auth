import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingForm , formRef}) {
    const inputUrlAvatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputUrlAvatarRef.current.value);

      }

    function close() {
        inputUrlAvatarRef.current.value = ''
        onClose()
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={close}
            buttonText="Сохранить"
            buttonLoadingText="Сохранение..."
            onSubmit={handleSubmit}
            isLoadingForm={isLoadingForm}
            formRef = {formRef}
        >
            <>
                <input ref={inputUrlAvatarRef} className="form__input form__input_content_link-avatar" id="input-url-avatar" type="url" name="urlAvatar"
                    placeholder="Ссылка на аватар" required />
                <span className="form__input-error input-url-avatar-error"></span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup