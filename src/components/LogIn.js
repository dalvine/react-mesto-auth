import React from 'react'
import {useHistory} from 'react-router-dom'
import auth from '../utils/auth'


function LogIn(props) {
    const history = useHistory()
    const [userData, setUserData] = React.useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        auth.authorization(userData)
            .then(data => {
                console.log(data)
                props.setLoggedIn(true)
            })
            .catch(err => {
                alert('Ошибка. Попробуйте еще раз')
            })
            .finally(() => {
                e.target.reset()
                setUserData({})
                history.push('/')
            })

    }


    return (
        <>
            <form className="form form_place_auth" onSubmit={handleSubmit}>
                <h2 className="form__header">Вход</h2>
                <input type="email" className="form__input form__input_place_auth" placeholder="Email" name="email" onChange={handleChange} required />
                <input type="password" className="form__input form__input_place_auth" placeholder="Пароль" name="password" onChange={handleChange} required />
                <button type="submit" className="form__button form__button_place_auth">Войти</button>
            </form>
        </>
    )
}

export default LogIn