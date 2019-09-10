import { USERS_SET } from '../actions';

const defaultState = {
    usersList: [],
  };

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
      case USERS_SET: 
        return { ...state, usersList: action.usersList };
      default:
        return state;
    }
  };

  export default userReducer;