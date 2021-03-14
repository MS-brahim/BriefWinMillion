import axios from 'axios';

export const apiLogin = request_data =>{
    return axios.post('/participant/login', request_data)
}

export const apiSignUp = (values) =>{
    return axios.post('/participant/signUp', values)
}