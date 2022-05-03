import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getUser } from './user'

// initial state
const initialState = {
    isLoading: false,
    token: '',
    tokenExist: '',
    error: '',
    isLogged: false,
    status: 'void',
}

// SLICE //      _____________________________________________________________

const { actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetching: {
            prepare: () => ({
                payload: {},
            }),
            reducer: (draft) => {
                draft.isLoading = true
                draft.token = ''
                draft.tokenExist = ''
                draft.error = ''
                draft.isLogged = false
                draft.status = 'pending'
                return
            },
        },
        resolved: {
            prepare: (token) => {
                return {
                    payload: { token },
                }
            },
            reducer: (draft, action) => {
                draft.isLoading = false
                draft.token = action.payload
                draft.tokenExist = true
                draft.isLogged = true
                draft.error = ''
                draft.status = 'resolved'
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
                draft.token = ''
                draft.tokenExist = false
                draft.isLogged = false
                draft.error = action.payload
                draft.status = 'rejected'
                return
            },
        },
    },
})

// CONSTANTS // __________________________________________________________________

const baseURL = 'http://localhost:3001/api/v1/user/'

// API CALLS // __________________________________________________________________

/**
 * to get user token with POST method in API Call
 * @function
 * @name getToken
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
export const getToken = (email, password) => {
    return (dispatch) => {
        dispatch(actions.fetching())
        axios
            .post(baseURL + 'login', {
                email,
                password,
            })
            .then((response) => {
                dispatch(actions.resolved(response.data.body.token))
                localStorage.setItem('token', response.data.body.token)
                const token = localStorage.getItem('token')
                dispatch(getUser(token))
            })
            .catch((error) => {
                dispatch(actions.rejected(error.message))
            })
    }
}
export default reducer
