import { loadData, saveData } from '../../utils/localStorage';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './actionTypes';

const isAuth = loadData('isAuth');
const fullName = loadData('username');
const apiKey = loadData('apiKey');

const initState = {
  isAuth: isAuth ? true : false,
  fullName: fullName ? fullName : '',
  apiKey: apiKey ? apiKey : '',
  isLoading: false,
  isError: false,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case LOGIN_SUCCESS: {
      const { fullName, apiKey } = payload;
      saveData('isAuth', true);
      saveData('fullName', fullName);
      saveData('apiKey', apiKey);
      return {
        ...state,
        isAuth: true,
        fullName: fullName,
        apiKey: apiKey,
        isLoading: true,
        isError: false,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case LOGOUT_SUCCESS: {
      saveData('isAuth', false);
      saveData('fullName', '');
      saveData('apiKey', '');
      return {
        ...state,
        isAuth: false,
        apiKey: '',
        fullName: '',
      };
    }
    default:
      return state;
  }
};
