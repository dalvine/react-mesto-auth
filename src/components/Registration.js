import React from 'react'
import {Link} from 'react-router-dom'

function Registration() {

    // фукнция обработки полей
    function handleSubmit(evt) {
        evt.stopPropagation()
    }


    return (
        <>
                <form className="form form_place_auth" onSubmit={handleSubmit}>
                    <h2 className="form__header">Регистрация</h2>
                    <input type="email" className="form__input form__input_place_auth" placeholder="Email" name="email" />
                    <input type ="password" className="form__input form__input_place_auth" placeholder="Пароль" name="password" />
                    <button type="submit" className="form__button form__button_place_auth">Зарегистрироваться</button>
                    <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
                </form>
        </>
    )
}

export default Registration