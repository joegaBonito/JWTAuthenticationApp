import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
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
      // console.log('accessToken from tokenSuccess: ' + action.payload.accessToken)
      // console.log('refreshToken from tokenSuccess: ' + action.payload.refreshToken)

      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    authenticatedSuccess: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        console.log('Slice: ' + state.isAuthenticated);
    },
    loadingSuccess: (state, action) => {
      state.isLoading = action.payload.isLoading;
  },
  },
});
export default slice.reducer

// Actions
const { loginSuccess, logoutSuccess, tokensSuccess, authenticatedSuccess,loadingSuccess } = slice.actions

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
export const tokens = ({ accessToken, refreshToken }) => async dispatch => {
  try {
    console.log('tokens action called')
    dispatch(tokensSuccess({accessToken, refreshToken}));
  } catch (e) {
    return console.error(e.message);
  }
}

export const isAuthenticatedAction = (isAuthenticated) => async dispatch => {
    try {
      console.log('Action isAuthenticated: '+isAuthenticated);
      dispatch(authenticatedSuccess({isAuthenticated:isAuthenticated}));
    } catch (e) {
      return console.error(e.message);
    }
}

export const isLoadingAction = (isLoading) => async dispatch => {
  try {
    dispatch(loadingSuccess({isLoading:isLoading}));
  } catch (e) {
    return console.error(e.message);
  }
}