import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
/**
 *
 * CSS for component using styled.components
 */
const Contents = styled.main`
    margin: 3rem auto;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;

    text-decoration-style: none;
`
const Number = styled.h1`
    color: ${colors.green};
    font-size: 4rem;
`
const Links = styled(Link)`
    text-decoration: none;
    font-size: 1rem;
    &:hover {
        color: ${colors.green};
        transform: scale(1.4);
    }
    @media (min-width: 720px) {
        font-size: 2rem;
    }
`
const Logo = styled.img`
    width: 20rem;
    @media (min-width: 720px) {
        width: 50rem;
    }
`
const Title = styled.h2`
    font-size: 2rem;
    @media (min-width: 720px) {
        font-size: 3rem;
    }
`

/**
 *
 * Render Error 404 page
 * @returns {JSX}
 */

function Error() {
    return (
        <Contents>
            <Logo src={argentBankLogo} alt="argentBank logo" />
            <Number>ERROR 404</Number>
            <Title>Désolé, cette page n'existe pas encore !</Title>
            <Links to="/">
                Pour retourner à la page d'accueil, cliquez ici.
            </Links>
        </Contents>
    )
}

export default Error
