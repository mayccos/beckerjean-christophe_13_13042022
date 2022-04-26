import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
})

function login(email, password) {
    return client
        .post(`/user/login`, {
            email,
            password,
        })
        .then((response) => {
            return response?.data?.body?.token
        })
}

function getInfos(token) {
    return client
        .post(
            `/user/profile`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response?.data?.body
        })
}

function updateInfos(firstName, lastName, token) {
    return client
        .put(
            `/user/profile`,
            {
                firstName,
                lastName,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response?.data?.body
        })
}

export default { login, getInfos, updateInfos }
