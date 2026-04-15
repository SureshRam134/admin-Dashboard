import { createSlice } from "@reduxjs/toolkit";



const initial = {
    roleId : '',
    email : '',
    token : '',

}
const tokenSlice = createSlice({
    name: "auth",
    initialState: initial,
   
    reducers: {
        setToken :(state, action) => { 
             state.roleId = action.payload.roleId;
             state.email = action.payload.email;
             state.token = action.payload.token;         
        },
        logOut :() => state = initial 
    }
})

export const {setToken, logOut} = tokenSlice.actions;
export default tokenSlice.reducer;