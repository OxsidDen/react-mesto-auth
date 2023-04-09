class Api {

    constructor({baseUrl, authorization}){
        this._baseUrl = baseUrl;
        this._authorization = authorization;
    }

    getProfile = () => {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                authorization:  this._authorization
            }
        })
        .then(res => this._chekStatus(res))
    };
    
    getCards = () => {
       return  fetch(this._baseUrl + '/cards', {
            headers: {
                authorization:  this._authorization
            }
        })
        .then(res => this._chekStatus(res))
    };
    
    changeProfile = (data) => {
        return  fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
             headers: {
                 authorization: this._authorization,
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                name: data.name,
                about: data.about
              }) 
         })
            .then(res => this._chekStatus(res))
        };
    
    addNewPost = (data) => {
        return  fetch(this._baseUrl + '/cards', {
            method: 'POST',
             headers: {
                 authorization:  this._authorization,
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                link: data.link,
                name: data.place,
              }) 
         })
            .then(res => this._chekStatus(res))
        };
    
    deletCard = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
             headers: {
                 authorization:  this._authorization,
             }
        })
        .then(res => this._chekStatus(res))
    };

    changeAvatar = (data) => {
    return  fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: data.avatar
        }) 
    })
        .then(res => this._chekStatus(res))
}

    putLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
            }
        })
        .then(res => this._chekStatus(res))
    }

    deletLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
            }
        })
            .then(res => this._chekStatus(res))
    }

    changeLikeCardStatus = (id, isLiked) => {
        if (!isLiked){
            return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: 'PUT',
                headers: {
                    authorization: this._authorization,
                }
            })
            .then(res => this._chekStatus(res))
        }
        else{
            return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization,
                }
            })
                .then(res => this._chekStatus(res))
        }
    }
    
    _chekStatus(res){
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    authorization: '08c90c1a-1998-40ee-b8a2-c5f50d26b954'
});

export default api;