import mongoose, { Schema } from 'mongoose'

const customerSchema = new mongoose.Schema({

    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true },
    tel: [{ type: String, required: true }],
    address: {
        street: { type: String, required: true },
        county: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    cpf: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => Date.now(), immutable: true }

})

const Customer = mongoose.model('Customer', customerSchema)

export default Customer