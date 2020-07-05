import { showLoading, hideLoading } from 'react-redux-loading-bar';

import {
    _getUser as getUser,
} from "../_DATA";

export const USER_HAS_LOGGED_IN = 'USER_HAS_LOGGED_IN';
export const USER_HAS_LOGGED_OUT = 'USER_HAS_LOGGED_OUT';

export function logUser(user) {
    return {
        type: USER_HAS_LOGGED_IN,
        authenticated: true,
        user: user
    }
}

export function logOutUser() {
    return {
        type: USER_HAS_LOGGED_OUT,
        authenticated: null,
        user: null
    }
}

// Thunks

export function userWantToLogIn(id) {
    return (dispatch) => {
        dispatch(showLoading());
        getUser(id).then((user) => {
            dispatch(logUser(user));
            dispatch(hideLoading());
        });
    };
}

// Is not being used
export function userWantToLogout() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(logOutUser());
        dispatch(hideLoading());
    }
}