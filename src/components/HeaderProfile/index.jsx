import styled from 'styled-components'
import { colors } from '../../utils/style/colors'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { edit } from '../../features/user'
import UserEditor from '../HeaderEdit'

// Creation components that using styled-component
const EditButton = styled.button`
    border-color: ${colors.green};
    background-color: ${colors.green};
    color: ${colors.white};
    font-weight: bold;
    padding: 10px;
`

const Header = styled.div`
    color: ${colors.white};
    margin-bottom: 2rem;
`
const HeaderTitle = styled.h1``

/**
 * Creation of a component to show the header profile page
 * @returns {JSX} headerProfile
 */
export default function HeaderProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //selector
    const user = useSelector((state) => state.user)

    const { firstName, lastName, editName } = user

    if (user === undefined) {
        return navigate('/')
    }
    const editMode = () => {
        dispatch(edit())
    }

    /**
     * @description handle the modifications made by user on his firstName and lastName
     * @param {object} event to get information about the action
     */

    return (
        <Header>
            <HeaderTitle>
                Welcome back <br />
                {!editName ? firstName + ' ' + lastName : ''}
            </HeaderTitle>
            {editName ? (
                <UserEditor firstName={firstName} lastName={lastName} />
            ) : (
                <EditButton onClick={editMode}>Edit name</EditButton>
            )}
        </Header>
    )
}
