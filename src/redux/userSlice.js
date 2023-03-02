import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../utils/contractUtils";


export const userSlice = createSlice({
    name:'user',
    initialState:{
        user: getAddress()
    },
    reducers : {
        USER_LOGIN : (state, action) => {
            state.user = action.payload
        },
        SET_USER : (state, action) => {
            state.user = action.payload
        },
        USER_LOGOUT : (state,action) => {
            state.user = {}
        }
    }
})

export const {USER_LOGIN,USER_LOGOUT,SET_USER} = userSlice.actions

export default userSlice.reducer