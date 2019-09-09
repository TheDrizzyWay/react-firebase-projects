import { AUTH_USER_SET, AUTH_USER_UNSET } from '../actions';

const defaultState = {
    authUser: null,
  };

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
      case AUTH_USER_SET: 
        return { ...state, authUser: action.authUser };
      case AUTH_USER_UNSET:
        return { ...state, authUser: null };
      default:
        return state;
    }
  }

  export default authReducer;
  