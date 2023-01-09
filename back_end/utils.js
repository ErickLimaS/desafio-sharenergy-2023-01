import jwt from "jsonwebtoken";
import cookieSession from 'cookie-session'

export function generateToken(userId) {

    return jwt.sign(
        { userId },
        'SEGREDOdoJWT',
        { expiresIn: '6h' }
    )

}

// export function checkCookies(req, res, next) {

//     req.cookies(cookieSession({
//         name: 'token',
//         keys: generateToken(req._id)
//     }))

// }