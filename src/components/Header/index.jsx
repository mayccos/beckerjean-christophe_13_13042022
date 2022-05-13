import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/login'
// Creation components that using styled-component
const MainNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    height: 40px;
`
const Div = styled.div``
const MainNavItem = styled(Link)`
    font-weight: bold;
    color: ${colors.grey};
    router-link-exact-active {
        color: ${colors.lightGreen};
    }
    text-decoration: none;
    margin-right: 0.5rem;
    :hover {
        text-decoration: underline;
    }
`
const MainNavLogo = styled(Link)`
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${colors.grey};
    router-link-exact-active {
        color: ${colors.lightGreen};
    }
`
const MainNavLogoImg = styled.img`
    max-width: 100%;
    width: 200px;
`

const H1 = styled.h1``

// JSX // _________________________________________________________________

/**
 * Creation of a component to show the header
 * @returns {JSX} header
 */

function Header() {
    const { isLogged } = useSelector((state) => state.login)
    const firstName = useSelector((state) => state.user.firstName)
    const isRemembered = localStorage.getItem('token')
    const dispatch = useDispatch()

    /**
     * to log out and destock token when remember case is not checked
     * @function
     * @name logout
     * @returns {object}
     */
    const signOut = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
    }
    return (
        <MainNav>
            <MainNavLogo to="/">
                <MainNavLogoImg
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <H1 className="sr-only">Argent Bank</H1>
            </MainNavLogo>
            {isRemembered || isLogged ? (
                <Div>
                    <MainNavItem to="/profile">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {firstName}
                    </MainNavItem>
                    <MainNavItem to="/login" onClick={signOut}>
                        <FontAwesomeIcon icon={faSignOut} />
                        Sign out
                    </MainNavItem>
                </Div>
            ) : (
                <Div>
                    <MainNavItem to="/login">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </MainNavItem>
                </Div>
            )}
        </MainNav>
    )
}
//Export
export default Header
