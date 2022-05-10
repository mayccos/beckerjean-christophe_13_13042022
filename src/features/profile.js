import { createSlice } from '@reduxjs/toolkit'
import { postUser } from '../hook/axios'
import { userData } from './user'

/**
 *  profile post
 *
 * @param Hooks -
 * @return reducer function, the state .
 * @param accessProfile -
 * @return check fetching status, order fetching and send action to reducer
 * @return state
 */

const initialState = {
    status: 'void',
    data: null,
    error: null,
    userId: null,
}

//Slice
const { actions, reducer } = createSlice({
    name: 'profile',
    initialState,
    reducers: {
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
                    draft.status = 'resolved'
                    draft.userId = action.payload
                }
            },
        },
        rejected: {
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.data = null
                    draft.status = 'rejected'
                }
            },
        },
    },
})
//Thunk
export const profilePost = () => async (dispatch, getState) => {
    const token = getState().user.token
    console.log(token)
    dispatch(actions.fetching())

    try {
        const data = await postUser(
            'http://localhost:3001/api/v1/user/profile',
            {},
            token
        )
        if (data.status !== 200) {
            throw new Error('Failed request')
        } else {
            dispatch(actions.resolved(data))
            const firstName = data.body.firstName
            const lastName = data.body.lastName
            const userId = data.body.id
            dispatch(userData(firstName, lastName, userId))
        }
    } catch (error) {
        dispatch(actions.rejected(error.message))
    }
}
//Export reducer
export default reducer
