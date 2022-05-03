import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user'
import loginReducer from '../features/login'
import editUserReducer from '../features/editUser'

export default configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        editUser: editUserReducer,
    },
})
