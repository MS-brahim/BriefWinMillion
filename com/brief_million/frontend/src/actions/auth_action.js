import {AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, LOGOUT} from './types';
import {apiLogin, apiSignUp} from '../api/user';
const TOKEN_NAME = 'Particip_token'

export const signUp = async (values) =>{
    try {
        const {data} = ({
            full_name: values.fullName,
            email: values.email,
            phone: values.phone,
            age: values.age,
            password: values.password
        })
        console.log(data);
        // return await signUp(data);
    } catch (error) {
        console.log(error.message);
    }
}
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