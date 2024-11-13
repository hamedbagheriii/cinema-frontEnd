import { GET_USER_ERROR, GET_USER_LOADING, GET_USER_RESPONSE } from './userType';

const initialState = {
  user: {},
  loading: true,
  error: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USER_LOADING:
      return { ...state, loading: true };
    break;

    case GET_USER_RESPONSE:
      return { ...state, loading: false, user: action.payLoad };
    break;

    case GET_USER_ERROR:
      return { ...state, loading: false, error: action.payLoad, user: {} };
    break;

    default:
      return state;
    break;
  }
};

export default userReducer;
