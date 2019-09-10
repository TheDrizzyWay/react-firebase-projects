export const AUTH_USER_SET = 'AUTH_USER_SET';
export const AUTH_USER_UNSET = 'AUTH_USER_UNSET';
export const USERS_SET = 'USERS_SET';

export const toggleAuth = authUser => dispatch => {
    authUser === null ? dispatch({
        type: AUTH_USER_UNSET
    }) : dispatch({
        type: AUTH_USER_SET,
        authUser
    });
};

export const setUsers = usersList => dispatch => {
  return dispatch({
    type: USERS_SET,
    usersList
  });
};
