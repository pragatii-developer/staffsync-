import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import hrmReducer from './hrmSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hrm: hrmReducer
  }
});

export default store;
