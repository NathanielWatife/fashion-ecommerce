import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo: null, token: null },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = null;
            state.token = action.payload.token;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
            state.token = null;
        },
    },
});


export const{ setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;