import {FETCH_GRP_MEMBER, GRP_MEMBER_SUCCESS, GRP_MEMBER_FAILED} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    groupsMember: [],
}
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_GRP_MEMBER:
            return {...state, fetching: true};
        case GRP_MEMBER_SUCCESS:
            return {...state, fetching: false, groupsMember:action.payload};
        case GRP_MEMBER_FAILED:
            return {...state, fetching: false};
        default:
            return state
    }
}