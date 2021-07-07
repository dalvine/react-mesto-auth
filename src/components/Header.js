import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import logo from '../images/logo.svg'

function Header() {

    const [openPanel, setOpenPanel] = React.useState(false)

    const openedUserPanel = () => {
        setOpenPanel(!openPanel)
    }

    return (
        <header className="header">
            <div className={`user-panel ${openPanel ? "user-panel_opened" : ""}`}>
                <Switch>
                    <Route exact path="/">
                        <p className="user-panel__email">email@mail.com</p>
                        <Link to='/' className="user-panel__logout">Выйти</Link>
                    </Route>
                    <Route path="/sign-in">
                        <Link to="/sign-up" className="user-panel__auth-link">Регистрация</Link>
                    </Route>
                    <Route path="/sign-up">
                        <Link to="/sign-in" className="user-panel__auth-link">Авторизация</Link>
                    </Route>
                </Switch>
            </div>
            <a href="https://dalvine.github.io/mesto/index.html" className="header__logo" target="_self">
                <img className="header__image" src={logo} alt="Логотип" />
            </a>
            <button className={`btn-opened-panel ${openPanel ? "btn-opened-panel_opened" : ""}`} onClick={openedUserPanel} />
        </header>
    )
}

export default Header