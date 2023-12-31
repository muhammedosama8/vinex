import axios from 'axios';
import swal from "sweetalert";
import { API_BASE_URL_ENV } from '../jsx/common/common';
import {
    changeAdminRules,
    loginConfirmedAction,
    Logout,
    setLang,
} from '../store/actions/AuthActions';

const tokenKey = "token";

export function login(email, password) {
    const postData = { email, password };
    return axios.post(`${API_BASE_URL_ENV()}/admin/login`, postData);
}

export function loginVerified(email, password, code) {
    const postData = {
        email,
        password,
        code
    };
    return axios.post(
        `${API_BASE_URL_ENV()}/admin/verify`,
        postData,
    );
}

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse?.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'User not Exist.':
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'Incorrect Password.':
            //return 'Invalid Password';
            swal("Oops", "Incorrect Password", "error",{ button: "Try Again!",});
            break;
        case 'كلمة سر خاطئة':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function saveTokenInLocalStorage(tokenDetails) {
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000,
    // );

    localStorage.setItem('adminLang', 'ar');
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
    localStorage.setItem(tokenKey, tokenDetails.accessToken);
    localStorage.setItem('LeapAdminRules', JSON.stringify(tokenDetails.admin.admin_roles?.map(item => item.role)));
}

// export function runLogoutTimer(dispatch, timer, navigate) {
//     setTimeout(() => {
//         //dispatch(Logout(history));
//         dispatch(Logout(navigate));
//     }, timer);
// }

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    const adminRules = localStorage.getItem('LeapAdminRules');
    const adminLang = localStorage.getItem('adminLang');
    let tokenDetails = '';

    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
		return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let rules = JSON.parse(adminRules);
    // let expireDate = new Date(tokenDetails.expireDate);
    // let todaysDate = new Date();

    // if (todaysDate > expireDate) {
    //     dispatch(Logout(navigate));
    //     return;
    // }
    dispatch(loginConfirmedAction(tokenDetails));
    dispatch(changeAdminRules(rules));

    if(adminLang === 'en'){
        dispatch(setLang('en'))
    } else {
        dispatch(setLang('ar'))
    }
	
    // const timer = expireDate.getTime() - todaysDate.getTime();
    // runLogoutTimer(dispatch, timer, navigate);
}
