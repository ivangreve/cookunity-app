import { User, UserLoginResponse } from "../pages/PublicPages/models";
import { configureStore } from '@reduxjs/toolkit'

export interface AppStore {
    user: User
}

export default configureStore<AppStore>({
    reducer: {
        user: userReducer
    }
})