import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import PropTypes from 'prop-types'

// Creation components that using styled-component for a feature
const AccountsSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${colors.black};
    background-color: ${colors.white};
    width: 80%;
    margin: 0 auto;
    flex-direction: row;
    padding: 1.5rem;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 2rem;
    @media (max-width: 470px) {
        flex-direction: column;
        width: 100%;
    }
`
const AccountContentWrapper = styled.div`
    width: 100%;
    flex: 1;
`
const AccountTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`
const AccountAmount = styled.p`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
    text-align: left;
`

const AccountAmountDescription = styled.p`
    margin: 0;
    text-align: left;
`
const AccountButtonWrapper = styled.div`
    @media (min-width: 720px) {
        flex: 0;
    }
`
const TransactionButton = styled.button`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: ${colors.green};
    background-color: ${colors.green};
    color: ${colors.white};
    @media (min-width: 720px) {
        width: 200px;
    }
`
/**
 * @description Component that show an account
 * @returns { JSX }
 */
function Account({ title, amount, description }) {
    return (
        <AccountsSection>
            <AccountContentWrapper>
                <AccountTitle>{title}</AccountTitle>
                <AccountAmount>{amount}</AccountAmount>
                <AccountAmountDescription>
                    {description}
                </AccountAmountDescription>
            </AccountContentWrapper>
            <AccountButtonWrapper>
                <TransactionButton>View transactions</TransactionButton>
            </AccountButtonWrapper>
        </AccountsSection>
    )
}
// PROPTYPES
Account.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
}

//EXPORT
export default Account
