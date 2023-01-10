import Axios from "axios";
import { useAppSelector } from "../redux/hooks";
import { store } from "../store";

interface customerTypes {
    name: {
        first: string,
        last: string
    },
    email: string,
    password: string,
    tel: string[],
    cpf: string
}

const URL = 'http://localhost:8000/customer'

const adminAccount: any = store.getState()

console.log(adminAccount)

// configutarion for requests
const reqConfig = (route?: string, body?: customerTypes, customerId?: string) => {

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
            'Authorization': `Bearer ${adminAccount.token}`
        },
        data: body,
        url: `${URL}${route}${customerId ? customerId : ''}`
    }

}

export async function getAllCustomers() {

    try {

        const { data } = await Axios(reqConfig('/all'))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}

export async function registerNewCustomer(bodyInfo: customerTypes) {

    try {

        const { data } = await Axios(reqConfig('/register', bodyInfo))

        return data

    }
    catch (error: any) {

        return error.response.data

    }

}

export async function updateCustomer(customerId: string, bodyInfo: customerTypes) {

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