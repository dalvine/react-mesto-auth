import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import logo from '../images/logo.svg'

function Header() {
    return (
        <header className="header">
            <a href="https://dalvine.github.io/mesto/index.html" className="header__logo" target="_self">
                <img className="header__image" src={logo} alt="Логотип" />
            </a>
            <div className="user-panel">
            <Switch>
                <Route exact path="/">
                <p className="user-panel__email">{/* e-mail пользователя */}</p>
                <Link to='/'  className="user-panel__link">Выйти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up"  className="user-panel__link">Регистрация</Link>
                    {/* авторизация */}
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in"  className="user-panel__link">Авторизация</Link>
                    {/* регистрация */}
                </Route>
            </Switch>
            </div>
        </header>
    )
}

export default Header