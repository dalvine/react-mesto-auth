import React from 'react'


function LogIn() {

    function handleSubmit(evt) {
        evt.stopPropagation()
    }
    // функция обработчик сабмита

    
    return (
        <>
         <form className="form form_place_auth" onSubmit={handleSubmit}>
             <h2 className="form__header">Вход</h2>
            <input type="email" className="form__input form__input_place_auth" placeholder="Email" name="email" />
            <input type ="password" className="form__input form__input_place_auth" placeholder="Пароль" name="password" />
            <button type="submit" className="form__button form__button_place_auth">Войти</button>
         </form>
        </>
    )
}

export default LogIn