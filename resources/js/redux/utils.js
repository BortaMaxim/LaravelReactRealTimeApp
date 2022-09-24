export const BASE_AUTH_URL = 'http://127.0.0.1:8000/auth/'
export const BASE_URL = 'http://127.0.0.1:8000/'

export const getAuthOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}
export const getOptions = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
}

export const postAuthOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}
export const postOptions = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
}

export const uploadAuthOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}


