
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducer/index.js';
import logger from 'redux-logger'
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
