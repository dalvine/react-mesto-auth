import React from 'react'
import PopupWithForm from './PopupWithForm'

function CofirmRemovePlacePopup({ onClose, handleConfirmCardDelete, card, isLoadingForm }) {

    function handleConfirm(e) {
        e.preventDefault()
        handleConfirmCardDelete(card)
    }

    return (
        <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            isOpen={card}
            onClose={onClose}
            buttonText="Да"
            buttonLoadingText="Удаление..."
            onSubmit={handleConfirm}
            isLoadingForm={isLoadingForm}
        />
    )
}

export default CofirmRemovePlacePopup