import Axios from "axios";

const URL = 'https://random.dog/woof.json'

// configutarion for requests
const reqConfig = () => {

    return {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: URL
    }

}

// request a random image from API 
export async function fetchNewImg() {

    const { data }: { data: { url: string } } = await Axios(reqConfig())

    return data.url

}