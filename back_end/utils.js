import jwt from "jsonwebtoken";
import AdminAccount from "./models/adminModel.js";

// Generates a Token when user logs in
export function generateToken(id) {

    return jwt.sign(
        { id },
        process.env.JWTSECRET,
        { expiresIn: '6h' }
    )

}

// Checks if the client who made the request is authorized 
export function isAuth(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {

        return res.status(401).json({
            success: false,
            message: 'Authorization Not Found.'
        })

    }

    const token = authorization.slice(7, authorization.length)

    jwt.verify(
        token, process.env.JWTSECRET, async (error, decode) => {

            if (error) {
                return res.status(401).json(
                    { success: false, message: 'Authorization Token Not Valid.' }
                )
            }

            // Checks if the account is from a Admin
            const isAdmin = await AdminAccount.findById(decode.id)

            if (!isAdmin) {

                return res.status(403).json(
                    { success: false, message: 'Not allowed. You are not a administrator.' }
                )

            }

            next()

        }
    )

}
