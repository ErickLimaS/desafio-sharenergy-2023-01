import { configureStore } from "@reduxjs/toolkit"
import { loginAdminUserReducer } from "./redux/reducers/userReducer"


const initialState: any = {
    adminUser: {
        username: typeof window !== "undefined" &&
            localStorage.getItem('username') ? localStorage.getItem('username') : null,
        token: typeof window !== "undefined" &&
            localStorage.getItem('token') ? localStorage.getItem('token') : null
    }
}

export const store = configureStore({
    reducer: {

        // user who will log in
        adminUser: loginAdminUserReducer,

    },
    preloadedState: initialState
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch