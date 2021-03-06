import axios from 'axios';

export const findParticipantApi = ()=>{
    return axios.get('/participant');
}