import { createSlice } from '@reduxjs/toolkit'
import {reactLocalStorage} from 'reactjs-localstorage';


// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: reactLocalStorage.get('accessToken'),
    refreshToken: reactLocalStorage.get('refreshToken'),
    isAuthenticated: false,
    isLoading: true
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
    },
    tokensSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    authenticatedSuccess: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isLoading = action.payload.isLoading;
        console.log('authenticatedSuccess Slice isAuthenticated: ' + state.isAuthenticated);
        console.log('authenticatedSuccess Slice isLoading: ' + state.isLoading);
        console.log('authenticatedSuccess Slice accessToken: ' + state.accessToken);
    },
    authenticatedFail: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isLoading = action.payload.isLoading;
        state.accessToken = action.payload.accessToken;
        console.log('authenticatedFail Slice isAuthenticated: ' + state.isAuthenticated);
        console.log('authenticatedFail Slice isLoading: ' + state.isLoading);
        console.log('authenticatedFail Slice accessToken: ' + state.accessToken);
    }
  },
});
export default slice.reducer

// Actions
const { loginSuccess, logoutSuccess, tokensSuccess, authenticatedSuccess,authenticatedFail } = slice.actions

export const login = ({ username, password }) => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({username}));
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}
export const tokens = ({accessToken, refreshToken}) => async dispatch => {
  try {
    console.log('tokens action called')
    dispatch(tokensSuccess({accessToken,refreshToken}));
  } catch (e) {
    return console.error(e.message);
  }
}

export const isAuthenticatedAction = (isAuthenticated, isLoading) => async dispatch => {
    try {
      if(isAuthenticated === true){ 
        dispatch(authenticatedSuccess({isAuthenticated:isAuthenticated, isLoading:isLoading}));
      } else {
        dispatch(authenticatedFail({isAuthenticated:isAuthenticated, isLoading:isLoading, accessToken:null}));
      }
    } catch (e) {
      return console.error(e.message);
    }
}