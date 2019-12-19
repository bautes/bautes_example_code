import axios from "axios"

export const API_ENDPOINT = 'http://www.mocky.io/v2/'

const fetch = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json"
  }
})

export const doRegister = data => new Promise((success, failure) => {
  fetch
    .post('5dfa7fdc360000b391bd6cf4', data)
    .then(({data}) => {
      success(data)
    })
    .catch(failure)
})

