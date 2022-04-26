import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Creation components that using styled-component
const MainNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
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
//const HeaderIcon = styled.i``
const H1 = styled.h1``
/**
 * Creation of a component to show the header
 * @returns {HTML element} header
 */

function Header() {
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
            <Div>
                <MainNavItem to="/login">
                    <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                    Sign In
                </MainNavItem>
            </Div>
        </MainNav>
    )
}

export default Header
