const userState = (state) => state.user

export const selectUser = (state) => userState(state)
export const selectStatus = (state) => userState(state).status

export const selectError = (state) => userState(state).error
export const selectTokenExist = (state) => userState(state).token.tokenExist
export const selectToken = (state) => userState(state).token
