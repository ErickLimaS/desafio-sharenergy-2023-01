interface UserGenTypes {

    email: string,
    picture: {
        medium: string,
        thumbnail: string
    },
    name: {
        title: string,
        first: string,
        last: string
    },
    login: {
        username: string
        sha256: string
    },
    dob: {
        age: number
    }

}