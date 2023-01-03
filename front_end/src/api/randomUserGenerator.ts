import Axios from "axios"

const qtyResults = 10
const URL = `https://randomuser.me/api/?results=${qtyResults}`

// configutarion for requests
const reqConfig = () => {

    return {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: URL
    }

}

export async function getUsers() {

    const { data }: { data: { results: object } } = await Axios(reqConfig())

    console.log(data)

    return data.results

}

