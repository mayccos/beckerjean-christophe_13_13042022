import axios from 'axios'

/**
 * axios data
 *
 * @param promise with axios post and put -
 * @return get and put data from and to api server
 * @return data and responses
 */
export const postLogin = async (url, body) =>
    axios
        .post(url, body)
        .then((response) => response.data)
        .catch((error) => error)

export const postUser = async (url, body, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios
        .post(url, body)
        .then((response) => response.data)
        .catch((error) => error)
}
export const putUser = async (url, body, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios
        .put(url, body)
        .then((response) => response.data)
        .catch((error) => error)
}
