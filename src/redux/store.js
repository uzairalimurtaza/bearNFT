import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
// import rootReducer from './reducers'

const store = configureStore({
  reducer: {
      user : userReducer
  },
  devTools: true
})

export default store