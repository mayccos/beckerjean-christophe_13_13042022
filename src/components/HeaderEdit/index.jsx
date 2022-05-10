import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { edit } from '../../features/user'
import styled from 'styled-components'
import { colors } from '../../utils/style/colors'

// Thunk
import { editUser } from '../../features/editUser'

// Creation components that using styled-component

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
 * create editor mode
 *
 * @param Hooks -
 * @return  redirection, reducer function.
 * @param save and cancel
 * @return user log out
 * @return JSX - editor mode
 * @return save and cancel function
 */

const UserEditor = ({ firstName, lastName }) => {
    const dispatch = useDispatch()
    const [firstname, setFirstName] = useState(firstName)
    const [lastname, setLastName] = useState(lastName)

    const save = (e) => {
        e.preventDefault()
        dispatch(editUser({ firstName: firstname, lastName: lastname }))
    }
    const cancel = () => {
        dispatch(edit())
    }
    return (
        <EditForm>
            <EditFormInputs>
                <EditFormInputCard>
                    <Label htmlFor="firstName" className="sr-only">
                        {firstname}
                    </Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        default-value={firstname}
                        placeholder={firstname}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                </EditFormInputCard>
                <EditFormInputCard>
                    <Label htmlFor="lastName" className="sr-only">
                        {lastname}
                    </Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        default-value={lastname}
                        placeholder={lastname}
                        onChange={(e) => {
                            setLastName(e.target.value)
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
                <CancelButton type="button" onClick={cancel}>
                    Cancel
                </CancelButton>
            </EditFormButtons>
        </EditForm>
    )
}
// Prop-Types
UserEditor.protoTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
}

//Export
export default UserEditor
