import { AnyAction } from "redux";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../constants/user";

export function loginAdminUserReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { ...state, loginUser: action.payload, loading: false, success: true }
        case USER_LOGIN_FAIL:
            return { ...state, message: action.payload, loading: false, success: false }
        default:
            return state
            
    }

}

export function logoutAdminUserReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_LOGOUT_REQUEST:
            return { ...state, loading: true }
        case USER_LOGOUT_SUCCESS:
            return { ...state, loginUser: action.payload, loading: false, success: true }
        case USER_LOGOUT_FAIL:
            return { ...state, message: action.payload, loading: false, success: false }
        default:
            return state

    }

} 