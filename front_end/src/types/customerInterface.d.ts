interface CustomerTypes {
    name: {
        first: string,
        last: string
    },
    address: {
        street: string,
        county: string,
        state: string,
        country: string
    }
    email: string,
    tel: [{
        ddd: string,
        tel: string
    }],
    cpf: string,
    _id?: string,
    createdAt?: Date
}