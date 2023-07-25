"use client"

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice';
import searchSlice from './features/search/searchSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice
  },
})