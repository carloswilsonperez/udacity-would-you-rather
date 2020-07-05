import {USER_HAS_LOGGED_IN, USER_HAS_LOGGED_OUT} from "../actions/login";

export default function login(state = {}, action) {
    switch (action.type) {
        case USER_HAS_LOGGED_IN:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            };
        case USER_HAS_LOGGED_OUT:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            };
        default:
            return state;
    }
}