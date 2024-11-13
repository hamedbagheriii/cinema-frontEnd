import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
