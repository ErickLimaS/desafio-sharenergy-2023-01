import express from "express"
import expressAsyncHandler from "express-async-handler"
import Customer from '../models/customerModel.js'
import { isAuth } from "../utils.js"

const customerRouter = express.Router()

// Gets all or queried customers and send back to client
customerRouter.get('/all', expressAsyncHandler(async (req, res) => {

    try {

        // If its queried for First Name, Email or CPF, it will return the exact Customer or some suggestions
        const customers = await Customer.find(
            req.query.last_name && {
                "name.last": { "$regex": `${req.query.last_name}`, "$options": "i" }
            } ||
            req.query.email && {
                "email": { "$regex": `${req.query.email}`, "$options": "i" }
            } ||
            req.query.cpf && {
                "cpf": { "$regex": `${req.query.cpf}`, "$options": "i" }
            } ||
            req.query.id && {
                "_id": `${req.query.id}`
            }
        )

        return res.status(200).json({
            success: true,
            customers: customers
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        })

    }
}))

// Register a new customer
customerRouter.post('/register', isAuth, expressAsyncHandler(async (req, res) => {

    try {

        const customer = await Customer.findOne({ cpf: req.body.cpf })

        if (customer) {

            return res.status(409).json({
                success: false,
                message: 'Já existe um cliente cadastrado com esse CPF.'
            })

        }

        const newCustomer = new Customer(req.body)

        await newCustomer.save()

        return res.status(200).json({
            success: true,
            message: 'Cliente criado com sucesso.'
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        })

    }
}))

// Updates customer's info by getting its ID from url params
customerRouter.put('/update/:id', isAuth, expressAsyncHandler(async (req, res) => {

    try {

        const id = req.params.id

        await Customer.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        ).orFail('Cliente não encontrado ou não cadastrado.')

        return res.status(200).json({
            success: true,
            message: 'Informações do cliente atualizadas com sucesso.'
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        })

    }
}))

// Delete customer from DB by getting its ID from url params
customerRouter.delete('/delete-customer/:id', isAuth, expressAsyncHandler(async (req, res) => {

    try {

        const id = req.params.id

        await Customer.findByIdAndDelete(id).orFail('Cliente não encontrado ou não cadastrado.')

        return res.status(200).json({
            success: true,
            message: 'Cliente removido do Banco de Dados com sucesso.'
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        })

    }
}))

export default customerRouter