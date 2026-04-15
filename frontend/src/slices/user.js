
import { createSlice } from "@reduxjs/toolkit";



const initial = []
const userSlice = createSlice({
    name: "user",
    initialState: initial,
   
    reducers: {
        setUser :(state, action) => state = action.payload,
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;