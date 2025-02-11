import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
  name: 'counter',
  initialState: {
    value:JSON.parse(localStorage.getItem("currentUser"))?JSON.parse(localStorage.getItem("currentUser")):null,
    
  },
  reducers: {
   
    AuthUserData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {AuthUserData } = AuthSlice.actions

export default AuthSlice.reducer