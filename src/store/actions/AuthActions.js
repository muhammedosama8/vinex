import {
    formatError,
    login,
    loginVerified,
    // runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';
import { isAuthenticated } from '../selectors/AuthSelectors';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN = 'login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const CHANGE_RULES = 'change rules';
export const SET_LOGO = 'change logo';
export const SET_LANG = 'change lang';


export function signupAction(email, password, navigate) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            // runLogoutTimer(
            //     dispatch,
            //     response.data.expiresIn * 1000,
            // );
            dispatch(confirmedSignupAction(response.data));
            navigate('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function Logout() {
	localStorage.removeItem('userDetails');
	localStorage.removeItem('LeapAdminRules');
	localStorage.removeItem('adminLang');
    isAuthenticated(false)
    
    if(!window.location.pathname.includes('login')) {
        window.location.href= '/login';
    }
    
	return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
         login(email, password).then((response) => {  
                if(response?.status === 200){
                    dispatch(loginFn({email, password:''}))  
                    saveTokenInLocalStorage(response.data);
                    dispatch(loginConfirmedAction(response.data));
                    navigate('/dashboard'); 
                }  
                dispatch(loadingToggleAction(false))  
            }).catch(error => {
                const errorMessage = formatError(error?.response?.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}
export function loginVerifiedAction(email, password,code, navigate) {
    return (dispatch) => {
        loginVerified(email, password, code)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                dispatch(loginConfirmedAction(response.data));  
                dispatch(loginFn({email, password: ''}))  
                dispatch(loadingToggleAction(false))               
				navigate('/dashboard');                
            })
            .catch((error) => {
                const errorMessage = formatError(error.response.data?.message);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginFn(data) {
    return {
        type: LOGIN,
        payload: data,
    };
}
export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
export function changeAdminRules(status) {
    return {
        type: CHANGE_RULES,
        payload: status,
    };
}

export function setLogo(status) {
    return {
        type: SET_LOGO,
        payload: status,
    };
}
export function setLang(status) {
    localStorage.setItem('adminLang' , status)
    document.body.className= status

    return {
        type: SET_LANG,
        payload: status,
    };
}
