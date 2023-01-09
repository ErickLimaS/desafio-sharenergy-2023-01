import Axios from "axios";

interface UserLoginTypes {
    username: string,
    password: string
}

const URL = 'http://localhost:8000/admin'

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

        const {data} = await Axios(reqConfig('login', userInfo))

        return data

    }
    catch (error: any) {

        return error.response.data
    }

}