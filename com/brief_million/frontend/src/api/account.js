import axios from 'axios';

export const apiGroupMember = ()=>{
    return axios.get('/groupMember');
}