import axios from 'axios'

// IMPORTS // ______________________________________________________________

import { createSlice } from '@reduxjs/toolkit'

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
 * to get user token with POST method in API Call
 * @function
 * @name getUser
 * @param {string} token
 * @returns {object}
 */
export const getUser = (token) => {
    return (dispatch) => {
        dispatch(actions.fetching())
        axios({
            method: 'POST',
            url: baseURL + 'profile',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                dispatch(actions.resolved(response.data))
            })
            .catch((error) => {
                dispatch(actions.rejected(error.message))
            })
    }
}

// SLICE //   ______________________________________________________________
const { actions, reducer } = createSlice({
    name: 'user',
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
                draft.isLogged = true
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
                draft.isLogged = false
                draft.user = {}
                draft.error = action.payload
                return
            },
        },
        logOut: {
            prepare: () => ({
                payload: {},
            }),
            reducer: (draft, action) => {
                draft.isLoading = false
                draft.isLogged = false
                draft.user = {}
                draft.error = action.payload
                return
            },
        },
    },
})

export const { logOut } = actions

export default reducer
