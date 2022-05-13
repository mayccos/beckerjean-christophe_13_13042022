import { createSlice } from '@reduxjs/toolkit'
import { postLogin } from '../hook/axios'
import { login } from './user'

/**
 * login post
 *
 * @param Hooks -
 * @return reducer function, the state .
 * @param loginPost -
 * @return check fetching status, order fetching and send action to reducer
 * @return state
 */

const initialState = {
    status: 'void',
    data: null,
    error: null,
    token: '',
    isLogged: '',
}
//Slice
const { actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: {
            reducer: () => {
                return initialState
            },
        },

        fetching: {
            reducer: (draft) => {
                if (draft.status === 'void') {
                    draft.status = 'pending'
                }
                if (draft.status === 'rejected') {
                    draft.error = null
                    draft.status = 'pending'
                }
                if (draft.status === 'resolved') {
                    draft.status = 'updating'
                }
            },
        },
        resolved: {
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.data = action.payload
                    draft.isLogged = !draft.isLogged
                    draft.token = true
                    draft.status = 'resolved'
                }
            },
        },
        rejected: {
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.data = null
                    draft.status = 'rejected'
                    draft.token = ''
                }
            },
        },
    },
})

//Thunk
export const loginPost = (email, password) => async (dispatch) => {
    dispatch(actions.fetching())
    try {
        const body = { email: email, password: password }
        const data = await postLogin(
            'http://localhost:3001/api/v1/user/login',
            body
        )

        if (data.status !== 200) {
            throw new Error(data.message)
        } else {
            dispatch(actions.resolved(data))
            dispatch(login(data.body.token))
        }
    } catch (error) {
        dispatch(actions.rejected(error.message))
    }
}
//Export actions
export const { logout } = actions
//Export reducer
export default reducer
