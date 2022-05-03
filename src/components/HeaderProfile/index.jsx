import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Selectors
import { /*selectToken, */ selectUser } from '../../utils/selector'
// Thunk
import { editUser } from '../../features/editUser'

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

const EditForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`
const EditFormInputs = styled.div`
    display: flex;
    gap: 20px;
`
const EditFormInputCard = styled.div`
    height: 40px;
    width: 200px;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
`
const Label = styled.label``
const Input = styled.input``
const EditFormButtons = styled.div`
    display: flex;
    gap: 20px;
`
const SaveButton = styled.button`
    width: 100px;
    padding: 5px;
    background-color: ${colors.green};
    color: ${colors.white};
    font-weight: bold;
    border-color: ${colors.green};
    cursor: pointer;
`
const CancelButton = styled.button`
    width: 100px;
    padding: 5px;
    background-color: ${colors.white};
    color: ${colors.green};
    font-weight: bold;
    border-color: ${colors.white};
    cursor: pointer;
`

/**
 * Creation of a component to show the header profile page
 * @returns {JSX} headerProfile
 */
export default function HeaderProfile() {
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const [EditName, setEditName] = useState(false)
    //const token = useSelector(selectToken) || localStorage.getItem('token')
    if (user === undefined) {
        return navigate('/')
    }

    const firstName = user.firstName
    const lastName = user.lastName

    /**
     * @description handle the modifications made by user on his firstname and lastname
     * @param {object} event to get informations about the action
     */
    const save = () => {
        dispatch(editUser(newFirstName, newLastName))
        setEditName(false)
    }

    return (
        <Header>
            <HeaderTitle>
                Welcome back <br />
                {!EditName ? { firstName } + ' ' + { lastName } : ''}
            </HeaderTitle>
            {EditName ? (
                <EditForm>
                    <EditFormInputs>
                        <EditFormInputCard>
                            <Label htmlFor="firstName" className="sr-only">
                                firstname
                            </Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={newFirstName}
                                placeholder={firstName}
                                onChange={(e) => {
                                    setNewFirstName(e.target.value)
                                }}
                            />
                        </EditFormInputCard>
                        <EditFormInputCard>
                            <Label htmlFor="lastName" className="sr-only">
                                lastname
                            </Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={newLastName}
                                placeholder={lastName}
                                onChange={(e) => {
                                    setNewLastName(e.target.value)
                                }}
                            />
                        </EditFormInputCard>
                    </EditFormInputs>
                    <EditFormButtons>
                        <SaveButton
                            type="submit"
                            className="headerProfile__editForm-save"
                            onClick={save}
                        >
                            Save
                        </SaveButton>
                        <CancelButton
                            type="button"
                            onClick={() => setEditName(false)}
                        >
                            Cancel
                        </CancelButton>
                    </EditFormButtons>
                </EditForm>
            ) : (
                <EditButton onClick={() => setEditName(true)}>
                    Edit name
                </EditButton>
            )}
        </Header>
    )
}
