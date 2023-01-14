import Axios from "axios";
import { store } from "../store";

// const URL = 'http://localhost:8000/customer'
const URL = 'https://desafio-sharenergy-9ttl.onrender.com/customer'

// configurarion for requests
const reqConfig = (route?: string, body?: CustomerTypes, customerId?: string) => {

    const storeState: any = store.getState()

    const { adminUser } = storeState

    let methodByRoute: string = ''

    switch (route) {
        case '/all':
            methodByRoute = 'GET'
            break
        case '/register':
            methodByRoute = 'POST'
            break
        case '/update/':
            methodByRoute = 'PUT'
            break
        case '/delete-customer/':
            methodByRoute = 'DELETE'
            break
        default:
            methodByRoute = 'GET'
            break
    }

    return {
        method: methodByRoute,
        // withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminUser.token}`
        },
        data: body,
        url: `${URL}${route}${customerId ? customerId : ''}`
    }

}

export async function getAllCustomers(query?: string) {

    try {

        const { data } = await Axios(reqConfig(`/all${query ? query : ''}`))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}

export async function registerNewCustomer(bodyInfo: CustomerTypes) {

    try {

        const { data } = await Axios(reqConfig('/register', bodyInfo))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}

export async function updateCustomer(customerId: string, bodyInfo: CustomerTypes) {

    try {

        const { data } = await Axios(reqConfig('/update/', bodyInfo, customerId))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}

export async function deleteCustomer(customerId: string) {

    try {

        const { data } = await Axios(reqConfig('/delete-customer/', undefined, customerId))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}