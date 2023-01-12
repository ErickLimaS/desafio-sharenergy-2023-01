import Axios from "axios"

const URL = `https://randomuser.me/api/`

// configutarion for requests
const reqConfig = (pagination: number, results?: number, seed?: string) => {

    return {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `${URL}?${pagination ? `page=${pagination}` : ''}${results ? `&results=${results}` : ''}${seed ? `&seed=${seed}` : ''}`
    }

}

export async function getUsers(pagination: number) {

    const { data }: { data: { results: object } } = await Axios(reqConfig(pagination, 5))

    return data.results

}

