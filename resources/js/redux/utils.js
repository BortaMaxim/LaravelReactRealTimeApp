export const BASE_AUTH_URL = 'http://127.0.0.1:8000/api/auth/'
export const BASE_URL = 'http://127.0.0.1:8000/api/'
export const URL = 'http://127.0.0.1:8000'

export const getAuthOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}

export const toastOptions = () => {
    return {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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


