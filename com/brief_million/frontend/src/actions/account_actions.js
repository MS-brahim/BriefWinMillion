import {apiGroupMember} from '../api/account';
import {FETCH_GRP_MEMBER, GRP_MEMBER_SUCCESS, GRP_MEMBER_FAILED} from '../actions/types';

export const fetchGroupMember = () => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_GRP_MEMBER})
            const {data} = await apiGroupMember();
            console.log(data);
            dispatch({type: GRP_MEMBER_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type: GRP_MEMBER_FAILED});
        }
    }
}