import {AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, LOGOUT} from './types';
import {apiLogin} from '../api/user';
const TOKEN_NAME = 'Particip_token'

export const logIn = request_data =>{

    return async dispatch =>{
        dispatch({type:AUTH_ATTEMPTING});
        try {
            const {data} = await apiLogin(request_data)
            // console.log(data);
            dispatch(success(data))
        } catch (e) {
            dispatch(error(e.response.data))
        }
    }
};

export const loadLogIn = () => {
    return dispatch => {
        try {
            let tokenP = localStorage.getItem(TOKEN_NAME);
            // console.log(localStorage.getItem(TOKEN_NAME));
            if (tokenP === null || tokenP === 'undefined') {
                return dispatch(error('need login first'))
            }
            dispatch(success(tokenP))
        } catch (e) {
            console.error(e);
        }
    }
}

export const logout = () => {
    localStorage.clear();
    return ({type:LOGOUT})
}

const success = (data) => {
    localStorage.setItem(TOKEN_NAME, data);
    // console.log(localStorage.getItem(TOKEN_NAME));
    return {type:AUTH_SUCCESS};
};
const error = (error) => {
    return {type:AUTH_FAILED, payload:error}
}