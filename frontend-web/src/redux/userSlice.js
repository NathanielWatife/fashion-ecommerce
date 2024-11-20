import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo: null, token: null },
    reducers: {
        setUserInfo: (state, action) => {
            const { user, token } = action.payload;
            state.userInfo = user;
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});


export const{ setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;