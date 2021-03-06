import axios from 'axios';

export const apiLogin = request_data =>{
    console.log(request_data);
    return axios.post('/participant/login', request_data)
}