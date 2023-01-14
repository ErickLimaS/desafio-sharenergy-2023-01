import Axios from "axios";

// const URL = 'http://localhost:8000/admin'
const URL = 'https://desafio-sharenergy-9ttl.onrender.com/admin'

// configutarion for requests
const reqConfig = (route?: string, body?: UserLoginTypes) => {

    return {
        method: 'POST',
        // withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: body,
        url: `${URL}${route ? `/${route}` : ''}`
    }

}

export async function loginAdminUser(userInfo?: UserLoginTypes) {

    try {

        const { data } = await Axios(reqConfig('login', userInfo))

        return data

    }
    catch (error: any) {

        return error.response.data
    }

}