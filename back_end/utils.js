import jwt from "jsonwebtoken";

export function generateToken(userId) {

    return jwt.sign(
        { userId },
        'SEGREDOdoJWT',
        { expiresIn: '6h' }
    )

}