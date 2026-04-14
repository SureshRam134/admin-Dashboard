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
             return state =  action.payload 
        },

        logOut :(state, action) => {          
            if(action.payload === "logout")  {
                return state = initial
            }
        }
    }
})

export const {setToken, logOut} = tokenSlice.actions;
export default tokenSlice.reducer;