import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { selectUser } from '../utils/selector'
//Initial state of Login's features
const initialState = {
    token: '',
    status: 'void',
    error: null,
}

export function getToken(email, password) {
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status

        if (status === 'pending' || status === 'updating') {
            return
        }
        dispatch(actions.fetching())
        try {
            const response = await axios.post(
                'http://localhost:3001/api/v1/user/login',
                { email, password }
            )
            const data = await response.data
            dispatch(actions.resolved(data.body.token))
        } catch (error) {
            dispatch(actions.rejected(error.message))
            window.location.replace('/*')
        }
    }
}

// Slice
const { actions, reducer } = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        fetching: (draft) => {
            if (draft.status === 'void') {
                // on passe en pending
                draft.status = 'pending'
                return
            }
            // si le statut est rejected
            if (draft.status === 'rejected') {
                // on supprime l'erreur et on passe en pending
                draft.error = null
                draft.status = 'pending'
                return
            }
            // si le statut est resolved
            if (draft.status === 'resolved') {
                // on passe en updating (requête en cours mais des données sont déjà présentent)
                draft.status = 'updating'
                return
            }
            // sinon l'action est ignorée
            return
        },
        resolved: (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending' || draft.status === 'updating') {
                // on passe en resolved et on sauvegarde les données
                draft.token = action.payload
                draft.status = 'resolved'
                draft.connected = !draft.connected
                return draft
            }
            // sinon l'action est ignorée
            return
        },
        rejected: (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending' || draft.status === 'updating') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.status = 'rejected'
                draft.error = action.payload
                draft.token = null
                return
            }
            // sinon l'action est ignorée
            return
        },
    },
})

export const logOut = actions.logOut

// we export reducer as default export
export default reducer
