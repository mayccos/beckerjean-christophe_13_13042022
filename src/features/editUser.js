import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// initial state
const initialState = {
    isLoading: false,
    isLogged: false,
    user: {},
    error: '',
}

// CONSTANTS // __________________________________________________________________

const baseURL = 'http://localhost:3001/api/v1/user/'

// CALL API //  __________________________________________________________________

/**
 *  thunk creator to edit user firstname and lastname with PUT method in API Call
 * @function
 * @name editUser
 * @param {string} firstName
 * @param {string} lastName
 * @returns {object}
 */
export const editUser = (firstName, lastName) => {
    const token = localStorage.getItem('token')
    return (dispatch) => {
        dispatch(actions.fetching())
        axios({
            method: 'PUT',
            url: baseURL + 'profile',
            headers: { Authorization: `Bearer ${token}` },
            data: {
                firstName,
                lastName,
            },
        })
            .then((response) => {
                dispatch(actions.resolved(response.data))
            })
            .catch((error) => {
                dispatch(actions.rejected(error.message))
            })
    }
}

// Slice //    ___________________________________________________________________
const { actions, reducer } = createSlice({
    name: 'editUser',
    initialState,
    reducers: {
        fetching: {
            prepare: () => ({
                payload: {},
            }),
            reducer: (draft) => {
                draft.isLoading = true
                return
            },
        },
        resolved: {
            prepare: (user) => {
                return {
                    payload: { user },
                }
            },
            reducer: (draft, action) => {
                draft.isLoading = false

                draft.user = action.payload
                draft.error = ''
                return
            },
        },
        rejected: {
            prepare: (error) => {
                return {
                    payload: { error },
                }
            },
            reducer: (draft, action) => {
                draft.isLoading = false

                draft.user = {}
                draft.error = action.payload
                return
            },
        },
    },
})

// we export reducer as default export
export default reducer
