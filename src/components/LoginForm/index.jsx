import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Thunk
import { getToken } from '../../features/login'

// Selectors
import {
    selectStatus,
    selectToken,
    selectTokenExist,
    //selectError,
    //selectLogged,
} from '../../utils/selector'

// Creation components that using styled-component
const Form = styled.form``
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
`
const InputLabel = styled.label`
    font-weight: bold;
`
const InputStyle = styled.input`
    padding: 5px;
    font-size: 1.2rem;
    margin-right: 0.5rem;
    &:hover {
    border: 2px solid ${colors.grey};
    border-radius: .2rem;
`
const InputRemember = styled.div`
    display: flex;
`
const RememberLabel = styled.label`
    margin-left: 0.25rem;
`
const LoginButton = styled.button`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: ${colors.green};
    background-color: ${colors.green};
    color: #fff;
`
const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`

/**
 * creation  component to display form
 * @name Form
 * @param {string} htmlFor
 * @param {string} inputType
 * @param {string} id
 * @param {string} value
 * @param {string} onChange
 * @returns {?JSX}
 */

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [invalidFields, setInvalidFields] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const token = useSelector(selectToken)
    const tokenExist = useSelector(selectTokenExist)
    //const connected = useSelector(selectLogged)
    /**
     *
     * @description Function that handle the log In event submit
     * @param {object} event to get informations about the action
     */
    //
    const handleSubmit = (e) => {
        e.preventDefault()
        setInvalidFields('')
        if (email === '' || password === '' || tokenExist === false) {
            return setInvalidFields('Invalid email or password')
        } else if (status === 'rejected') {
            return setInvalidFields('Sorry, a technical Error occurred ')
        } else {
            dispatch(getToken(email, password))
        }
    }

    // if (connected === true) {
    //     return navigate('/profile')
    // }
    useEffect(() => {
        if (status === 'resolved') {
            if (!window.localStorage.getItem('token') && checked) {
                window.localStorage.setItem('token', token)
            }
            navigate('/profile')
        }
    }, [checked, navigate, status, token])

    return (
        <Form onSubmit={handleSubmit}>
            <InputWrapper>
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputStyle
                    type="text"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                <InputLabel htmlFor="password">Password</InputLabel>
                <InputStyle
                    type="text"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </InputWrapper>
            <InputRemember>
                <InputStyle
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <RememberLabel htmlFor="rememberMe">Remember me</RememberLabel>
            </InputRemember>
            <ErrorMessage>{invalidFields}</ErrorMessage>

            <LoginButton type="submit">Sign In</LoginButton>
        </Form>
    )
}
