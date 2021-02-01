import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './user'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
    user
})

const store = configureStore({
  reducer,
})

export default store;

// const persistConfig = {
//   key: 'root',
//   persistStore
// };

// const persistedReducer = persistReducer(persistConfig, reducer);


// const store = configureStore({
//   reducer: persistedReducer,
//   // devTools: process.env.NODE_ENV !== 'production',
//   // middleware: [thunk]
// });

// export default store;
