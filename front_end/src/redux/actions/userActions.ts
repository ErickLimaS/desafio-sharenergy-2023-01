import { Dispatch } from "react"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../constants/user"
import { loginAdminUser } from "../../api/userMongoServer"
import { AnyAction } from "redux"

export const loginUser = (action: string, userLoginInfo?: UserLoginTypes) => async (dispatch: Dispatch<AnyAction>) => {

    switch (action) {
        case 'logout':
            dispatch({
                type: USER_LOGOUT_REQUEST
            })

            try {

                localStorage.removeItem('username')
                localStorage.removeItem('token')

                dispatch({
                    type: USER_LOGOUT_SUCCESS,
                    payload: {}
                })

                window.location.reload()

            }
            catch (error: unknown) {

                dispatch({
                    type: USER_LOGOUT_FAIL,
                    payload: error
                })

            }

            break

        case 'login':

            dispatch({
                type: USER_LOGIN_REQUEST
            })

            try {

                const res: serverResponseTypes | any = await loginAdminUser(userLoginInfo)

                if (!res.success) {

                    dispatch({
                        type: USER_LOGIN_FAIL,
                        payload: res.message
                    })

                    return

                }

                if (userLoginInfo?.rememberMe === true) {

                    localStorage.setItem('username', res.account.username)
                    localStorage.setItem('token', res.account.token)

                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: res.account
                    })

                    return window.location.reload()

                }

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.account
                })


            }
            catch (error: unknown) {

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: error
                })

            }

            break

        default:

            break
    }


}
