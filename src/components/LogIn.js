import React from 'react'
import auth from '../utils/auth'


function LogIn(props) {
    const [userData, setUserData] = React.useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        auth.authorization(userData)
            .then(data => {
                localStorage.setItem('token', data.token) 
                props.setLoggedIn(true)
            })
            .catch(() => {
                alert('Ошибка. Попробуйте еще раз')
                setUserData({})
            })
            .finally(() => {
                e.target.reset()

            })

    }


    return (
        <>
            <form className="form form_place_auth" onSubmit={handleSubmit}>
                <h2 className="form__header">Вход</h2>
                <input type="email" className="form__input form__input_place_auth" placeholder="Email" name="email"  value={userData.email} onChange={handleChange} required />
                <input type="password" className="form__input form__input_place_auth" placeholder="Пароль" name="password" value={userData.password} onChange={handleChange} required />
                <button type="submit" className="form__button form__button_place_auth">Войти</button>
            </form>
        </>
    )
}

export default LogIn