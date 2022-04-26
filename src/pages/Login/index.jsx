import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
// import components
import LoginForm from '../../components/LoginForm'
// Creation components that using styled-component
const SignInContent = styled.section`
    box-sizing: border-box;
    background-color: ${colors.white};
    width: 300px;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 2rem;
`

const H1 = styled.h1``
/**
 * creation of a component to display website's login page
 * @name Home
 * @returns {JSX}
 */
export default function Login() {
    return (
        <main className="main">
            <SignInContent>
                <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
                <H1>Sign In</H1>
                <LoginForm />
            </SignInContent>
        </main>
    )
}
