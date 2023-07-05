import { configureStore } from '@reduxjs/toolkit'
import accessReducer from './access';

export default configureStore({
  reducer: {
    access: accessReducer
  },
})