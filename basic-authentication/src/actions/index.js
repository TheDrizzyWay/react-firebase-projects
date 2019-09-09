export const AUTH_USER_SET = 'AUTH_USER_SET';
export const AUTH_USER_UNSET = 'AUTH_USER_UNSET';

export const toggleAuth = authUser => dispatch => {
    authUser === null ? dispatch({
        type: AUTH_USER_UNSET
    }) : dispatch({
        type: AUTH_USER_SET,
        authUser
    });
};