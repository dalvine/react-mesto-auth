import React from 'react'
import ImageStatusTrue from '../images/status-reg-true.svg'
import ImageStatusFalse from '../images/status-reg-false.svg'


function PopupWithStatusRegistration({ onClose, isOpen, statusReg }) {
    return (
        <section
            className={`popup popup_content_status ${isOpen ? "popup_opened" : null}`
            }>
            <div className="popup__container">
                <div className="status-reg">
                    <img className="status-reg__img" src={statusReg ? ImageStatusTrue : ImageStatusFalse} alt={statusReg ? "Успешная регистрация" : "Что-то пошло не так"} />
                    <p className="status-reg__text">{statusReg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                </div>
                <button
                    type="button"
                    className={`popup__close popup__close_content_status`}
                    onClick={onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithStatusRegistration