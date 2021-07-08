class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }


  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      "method": "GET",
      "headers": this._headers
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      "method": "GET",
      "headers": this._headers
    })
      .then(this._checkResponse)
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      "method": "PATCH",
      "headers": this._headers,
      "body": JSON.stringify({
        "name": data.name,
        "about": data.about,
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      "method": "POST",
      "headers": this._headers,
      "body": JSON.stringify({
        "name": data.name,
        "link": data.link,
      })
    })
      .then(this._checkResponse)
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      "method": "PATCH",
      "headers": this._headers,
      "body": JSON.stringify({
        "avatar": link,
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      "method": "DELETE",
      "headers": this._headers,
    })
      .then(this._checkResponse)
  }

  changeLike(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        "method": "PUT",
        "headers": this._headers,
      })
        .then(this._checkResponse)
    } else {
      return fetch(`${this._url}/cards/likes/${id}`, {
        "method": "DELETE",
        "headers": this._headers,
      })
        .then(this._checkResponse)
    }
  }

  _checkResponse(res) {
    if (res.ok) return res.json()
    return Promise.reject(res.json())
  }


}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'ee54480d-8407-451a-93a4-4101fced51f5',
    'Content-Type': 'application/json'
  }
});

export default api
