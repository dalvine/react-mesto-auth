import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import PopupWithStatusRegistration from './PopupWithStatusRegistration'
import auth from '../utils/auth'

function Registration() {

    const history = useHistory()
    
    const [userData, setUserData] = React.useState({})
    const [statusReg, setStatusReg] = React.useState(false)
    const [openModalResultRegister, setOpenModalResultRegister] = React.useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        auth.register(userData)
            .then(data => {
                setStatusReg(true)
            })
            .catch(err => {
                setStatusReg(false)
            })
            .finally(() => {
                setOpenModalResultRegister(true)
                e.target.reset()
            })
    }

    const onCloseModalResultRegister = () => {
        setOpenModalResultRegister(false)
        if (statusReg) history.push('./sign-in')
    }


    return (
        <>
            <form className="form form_place_auth" onSubmit={handleSubmit}>
                <h2 className="form__header">Регистрация</h2>
                <input type="email" className="form__input form__input_place_auth" placeholder="Email" name="email" value="" onChange={handleChange} required />
                <input type="password" className="form__input form__input_place_auth" placeholder="Пароль" name="password" value="" onChange={handleChange} required />
                <button type="submit" className="form__button form__button_place_auth">Зарегистрироваться</button>
                <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
            </form>
            <PopupWithStatusRegistration statusReg={statusReg} isOpen={openModalResultRegister} onClose={onCloseModalResultRegister} />
        </>
    )
}

export default Registration