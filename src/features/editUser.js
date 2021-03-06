import { createSlice } from '@reduxjs/toolkit'
import { putUser } from '../hook/axios'
import { userEdition } from './user'

/**
 * request profile
 *
 * @param Hooks -
 * @return reducer function, the state .
 * @param editUser-
 * @return check fetching status, order fetching and send action to reducer
 * @return state
 */

const initialState = {
    status: 'void',
    data: null,
    error: null,
}
//Slice
const { actions, reducer } = createSlice({
    name: 'edition',
    initialState,
    reducers: {
        fetching: {
            reducer: (draft) => {
                if (draft.status === 'void') {
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'rejected') {
                    draft.error = null
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'resolved') {
                    draft.status = 'updating'
                    return
                }
                return
            },
        },
        resolved: {
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.data = action.payload
                    draft.status = 'resolved'
                    return
                }
                return
            },
        },
        rejected: {
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.data = null
                    draft.status = 'rejected'
                    return
                }
                return
            },
        },
    },
})
//Thunk
export const editUser = (body) => {
    return async (dispatch, getState) => {
        const token = getState().user.token

        dispatch(actions.fetching())

        try {
            const data = await putUser(
                'http://localhost:3001/api/v1/user/profile',
                body,
                token
            )
            if (data.status !== 200) {
                throw new Error(data.message)
            } else {
                dispatch(actions.resolved(data))
                dispatch(userEdition(data.body))
            }
        } catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}
//Export reducer
export default reducer
