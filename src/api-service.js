
export default class API {
    static updateMovie(mov_id, body, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static loginUser(body) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( body )
        })
            .then( resp => resp.json())

    }

    static registerUser(body) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( body )
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static deleteMovie(mov_id, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${token}`
            },
        })
            .then( resp => resp.json())
            .catch( error => console.log(error))
    }

    static getMovie(mov_id, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/${mov_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${token}`
            }
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static createMovie(body, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static rateClicked (rate, mov_id, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/${mov_id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( {stars: rate + 1} )
        })
            .catch( error => console.log(error))
    }

    static getDetails (mov_id, token) {
        return fetch(`https://movieraterapi-project.georgetong.cloud/api/movies/${mov_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${token}`
            }
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static getMovies (token) {
        return fetch("https://movieraterapi-project.georgetong.cloud/api/movies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

}



