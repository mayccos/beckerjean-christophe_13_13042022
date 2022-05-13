import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// thunk
import { profilePost } from '../../features/profile'
// import accounts mocked
import accounts from '../../_Mocks_/accounts'

//import Components
import HeaderProfile from '../../components/HeaderProfile'
import Account from '../../components/Account'

// Creation components that using styled-component
const Main = styled.main`
    flex: 1;
    background-color: ${colors.darkBlue};
    height: 43rem;
`

const H2 = styled.h2``
function Profile() {
    const dispatch = useDispatch()
    const token =
        useSelector((state) => state.login.token) ||
        localStorage.getItem('token')
    console.log(token)
    useEffect(() => {
        dispatch(profilePost(token))
    })
    return (
        <Main>
            <HeaderProfile />
            <H2 className="sr-only">Accounts</H2>

            {accounts.map((account, index) => (
                <Account
                    key={index}
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                />
            ))}
        </Main>
    )
}
export default Profile
