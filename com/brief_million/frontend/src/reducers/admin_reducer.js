import {FETCHING_PARTICIPANT, FETCH_SUCCESS, FETCH_FAILED} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    participants: [],
}
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_PARTICIPANT:
            return {...state, fetching: true};
        case FETCH_SUCCESS:
            return {...state, fetching: false, participants:action.payload};
        case FETCH_FAILED:
            return {...state, fetching: false};
        default:
            return state
    }
}