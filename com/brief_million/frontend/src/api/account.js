import axios from 'axios';

export const apiGroupMember = ()=>{
    return axios.get('/groupMember');
}

export const apiJoinGroup = ()=>{
    return axios.put('/groupMember/join/');
}