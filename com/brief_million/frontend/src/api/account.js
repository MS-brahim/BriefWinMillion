import axios from 'axios';

export const apiGroupMember = ()=>{
    return axios.get('/groupMember');
}

export const apiJoinGroup = (id)=>{
    return axios.put('/groupMember/join/'+id);
}