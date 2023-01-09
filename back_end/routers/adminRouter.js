import express from "express";
import AdminAccount from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const adminRouter = express.Router()

const saltRounds = 10

// creates account
adminRouter.post('/register', expressAsyncHandler(async (req, res) => {

    try {
        const accountExist = await AdminAccount.findOne({ email: req.body.email })

        if (accountExist) {

            return res.status(409).json({
                success: false,
                message: 'This email already was used on another account.'
            })

        }

        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        const newAdminAccount = new AdminAccount(req.body)

        await newAdminAccount.save()

        return res.status(201).json({
            success: true,
            message: 'Account Created Successfully.'
        })
    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: `Internal Error. ${error}`
        })

    }

}))

// login account
adminRouter.post('/login', expressAsyncHandler(async (req, res) => {

    try {
        const account = await AdminAccount.findOne({ username: req.body.username })

        // if Email doesnt exist on DB
        if (!account) {

            return res.status(401).json({
                success: false,
                message: 'Something is wrong with either your email or password. Try again.'

            })
        }

        const passwordIsCorrect = await bcrypt.compare(req.body.password, account.password)

        // if Password doesnt match
        if (!passwordIsCorrect) {

            return res.status(401).json({
                success: false,
                message: 'Something is wrong with either your email or password. Try again.'
            })

        }

        return res.status(202).json({
                success: true,
                message: 'Login Accepted.',
                account: {
                    username: account.username,
                    token: generateToken(account._id)
                }
            })
    }
    catch (error) {

        return res.status(500).setHeader.json({
            success: false,
            message: `Internal Error. ${error}`
        })

    }

}))

export default adminRouter