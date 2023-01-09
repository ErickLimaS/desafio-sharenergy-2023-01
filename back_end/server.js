import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import adminRouter from './routers/adminRouter.js';
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT

const app = express();

app.use(cookieParser())

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL).then(
    console.log('DB Conectado.')
)

app.use('/admin', adminRouter)
// app.use('/customer', customersRouter)

app.listen(PORT, () => {

    console.log(`Connect on PORT ${PORT}`)

})