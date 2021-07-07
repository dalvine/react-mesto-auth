import React from 'react'

function PopupWithForm({ title, name, isOpen, onClose, children, buttonText, onSubmit, isLoadingForm, buttonLoadingText, formRef  }) {


    return (
        <section 
        className={`popup popup_content_${name} ${isOpen ? "popup_opened" : null}`
        }>
            <div className="popup__container">
                <form ref={formRef} className="form" name={name} onSubmit={onSubmit}>
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button className="form__button" type="submit">{isLoadingForm ? buttonLoadingText : buttonText}</button>
                </form>
                <button
                    type="button"
                    className={`popup__close popup__close_content_${name}`}
                    onClick={onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithForm