import {findParticipantApi} from '../api/admin';
import {FETCHING_PARTICIPANT, FETCH_SUCCESS, FETCH_FAILED} from '../actions/types';

export const fetchParticipant = () => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCHING_PARTICIPANT})
            const {data} = await findParticipantApi();
            // console.log(data);
            dispatch({type: FETCH_SUCCESS, payload:data.participants})
        } catch (error) {
            dispatch({type: FETCH_FAILED});
        }
    }
}