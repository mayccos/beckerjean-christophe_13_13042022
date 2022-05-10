import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Thunk
import { loginPost } from '../../features/login'

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
 * create Form JSX
 *
 * @function  handleSubmit
 * @return user login
 * @return html - Form
 */
export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [invalidFields, setInvalidFields] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //selector
    const { status } = useSelector((state) => state.login)
    const { error } = useSelector((state) => state.login)

    /**
     *
     * @description Function that handle the log In event submit
     * @param {object} event to get information about the action
     */
    //
    const handleSubmit = (e) => {
        e.preventDefault()
        setInvalidFields('')
        if (email === '' || password === '') {
            return setInvalidFields('Invalid email or password')
        } else {
            dispatch(loginPost(email, password))
        }
    }
    // function to manage the  response case resolved
    useEffect(() => {
        if (status === 'resolved') {
            navigate('/profile')
        }
    }, [navigate, status])

    //function to manage the  response case of invalid credentials
    useEffect(() => {
        if (error === 'Request failed with status code 400') {
            setInvalidFields('Invalid email or password')
        }
    }, [setInvalidFields, error])

    //function to manage the   case  of not response of api
    useEffect(() => {
        if (error === 'Network Error') {
            return setInvalidFields('Sorry, a technical Error occurred ')
        }
    }, [setInvalidFields, error])

    return (
        <Form onSubmit={handleSubmit}>
            <InputWrapper>
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputStyle
                    type="text"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value.trim())}
                />
            </InputWrapper>
            <InputWrapper>
                <InputLabel htmlFor="password">Password</InputLabel>
                <InputStyle
                    type="text"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value.trim())}
                />
            </InputWrapper>
            <InputRemember>
                <InputStyle type="checkbox" name="rememberMe" id="rememberMe" />
                <RememberLabel htmlFor="rememberMe">Remember me</RememberLabel>
            </InputRemember>
            <ErrorMessage>{invalidFields}</ErrorMessage>

            <LoginButton type="submit">Sign In</LoginButton>
        </Form>
    )
}
