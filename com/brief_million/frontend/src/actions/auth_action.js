import {AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, LOGOUT, SIGNUP_SUCCESS} from './types';
import {apiLogin, apiLoginAdmin, apiSignUp} from '../api/user';
const TOKEN_NAME = 'token'

export const signUp = (request_data) =>{
    return async dispatch => {
        try {
            await apiSignUp(request_data)
            dispatch({type:SIGNUP_SUCCESS})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const logInAdmin = request_data =>{

    return async dispatch =>{
        dispatch({type:AUTH_ATTEMPTING});
        try {
            const {data:{token,authAdmin}} = await apiLoginAdmin(request_data)
            dispatch(success(token))
            localStorage.setItem('idAdmin', authAdmin._id);
        } catch (e) {
            dispatch(error(e.response.data))
        }
    }
};

export const logIn = request_data =>{

    return async dispatch =>{
        dispatch({type:AUTH_ATTEMPTING});
        try {
            const {data:{token,authParticip}} = await apiLogin(request_data)
            dispatch(success(token))
            localStorage.setItem('idAuthP', authParticip._id);
        } catch (e) {
            dispatch(error(e.response.data))
        }
    }
};

export const loadLogIn = () => {
    return dispatch => {
        try {
            let tokenP = localStorage.getItem(TOKEN_NAME);

            if (tokenP === null || tokenP === 'undefined') {
                return dispatch(error('You need to login first'))
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

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
    return {type:AUTH_SUCCESS};
};
const error = (error) => {
    return {type:AUTH_FAILED, payload:error}
}