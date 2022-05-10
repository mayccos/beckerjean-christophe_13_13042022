import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

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
 * to log out and unstock token
 * @function
 * @name logout
 * @returns {object}
 */
export const logout = () => {
    localStorage.clear()
    window.location = '/'
}
/**
 * Creation of a component to show the header
 * @returns {JSX} header
 */

function Header() {
    const { isLogged } = useSelector((state) => state.login)
    const firstName = useSelector((state) => state.user.firstName)

    return (
        <MainNav>
            <MainNavLogo to="/">
                <MainNavLogoImg
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                    onClick={logout}
                />
                <H1 className="sr-only">Argent Bank</H1>
            </MainNavLogo>
            {!isLogged ? (
                <Div>
                    <MainNavItem to="/login">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </MainNavItem>
                </Div>
            ) : (
                <div>
                    <MainNavItem to="/profile">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {firstName}
                    </MainNavItem>
                    <MainNavItem to="/" onClick={logout}>
                        <FontAwesomeIcon icon={faSignOut} />
                        Sign out
                    </MainNavItem>
                </div>
            )}
        </MainNav>
    )
}
//Export
export default Header
