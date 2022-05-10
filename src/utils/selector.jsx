const userState = (state) => state.user
const loginState = (state) => state.login
export const selectUser = (state) => userState(state)
export const selectStatus = (state) => loginState(state).status
export const selectLogged = (state) => loginState(state).isLogged
export const selectError = (state) => userState(state).error

export const selectToken = (state) => loginState(state).token
export const selectUserFirstName = (state) => userState(state).firstName
export const selectUserLastName = (state) => userState(state).lastName
export const selectTokenExist = (state) => loginState(state).tokenExist
