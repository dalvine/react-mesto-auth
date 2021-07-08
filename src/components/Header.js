import React from 'react'
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import logo from '../images/logo.svg'

function Header(props) {
    const history = useHistory()
    const [openPanel, setOpenPanel] = React.useState(false)

    const openedUserPanel = () => {
        setOpenPanel(!openPanel)
    }

    const logOut = () => {
        props.setloggedIn(false)
        history.push('/')
    }

    return (
        <header className={`header ${props.loggedIn ? "" : "header_reverse"}`}>
            <div className={`user-panel ${openPanel ? "user-panel_opened" : ""} ${props.loggedIn ? "" : "user-panel_show"}`}>
                <Switch>
                    <Route exact path="/">
                        <p className="user-panel__email">email@mail.com</p>
                        <p onclick={logOut} to='/' className="user-panel__logout">Выйти</p>
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
            <button className={`btn-opened-panel ${openPanel ? "btn-opened-panel_opened" : ""} ${props.loggedIn ? "" : "btn-opened-panel_hidden"}`} onClick={openedUserPanel} />
        </header>
    )
}

export default Header