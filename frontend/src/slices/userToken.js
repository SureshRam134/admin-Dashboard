import { createSlice } from "@reduxjs/toolkit";



const initial = {}
const tokenSlice = createSlice({
    name: "auth",
    initialState: initial,
   
    reducers: {
        setToken :(state, action) => state = action.payload,
        logOut :(state, action) =>  state = initial 
    }
})

export const {setToken, logOut} = tokenSlice.actions;
export default tokenSlice.reducer;