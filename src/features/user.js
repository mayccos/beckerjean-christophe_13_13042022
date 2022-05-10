import { createSlice } from '@reduxjs/toolkit'

/**
 * The "main" reducer
 *
 * @return state
 */

const initialState = {
    token: '',
    firstName: '',
    lastName: '',
    editName: false,
}

//Slice
const { actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: {
            prepare: (token) => ({ payload: { token } }),
            reducer: (draft, action) => {
                draft.token = action.payload.token
            },
        },
        userLogout: {
            reducer: () => {
                return initialState
            },
        },
        userData: {
            prepare: (firstName, lastName) => ({
                payload: { firstName, lastName },
            }),
            reducer: (draft, action) => {
                draft.firstName = action.payload.firstName
                draft.lastName = action.payload.lastName
            },
        },
        edit: {
            reducer: (draft) => {
                draft.editName = !draft.editName
            },
        },
        userEdition: {
            prepare: (body) => ({
                payload: { firstName: body.firstName, lastName: body.lastName },
            }),
            reducer: (draft, action) => {
                if (draft.editName === true) {
                    draft.firstName = action.payload.firstName
                    draft.lastName = action.payload.lastName
                    draft.editName = false
                }
            },
        },
    },
})
//Export actions
export const { login, userLogout, userData, edit, userEdition } = actions
//Export reducer
export default reducer
