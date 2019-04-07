import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITAL_STATE, action) => {
  //if undefined, get initial_state
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    //modiferar bara isSignedIn
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    //modiferar bara isSignedOut
    default:
      return state;
  }
};
