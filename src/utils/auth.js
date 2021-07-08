class Auth {
    constructor() {
        this._baseUrl = 'https://auth.nomoreparties.co'
    }

    register({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResponse)
    }

    authorization({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResponse)
    }

    getToken(JWT) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            }
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }

    _checkResponse(res) {
        if (res.ok) return res.json()
        return Promise.reject(res.json())
    }
}

export default new Auth()