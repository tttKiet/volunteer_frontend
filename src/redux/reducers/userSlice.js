import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogined: true,
        userData: {},
    },
    reducers: {
        toggleUserLogin(state, actions) {
            console.log('toggle user login', actions);
            if (actions.payload === true) {
                state.isLogined = actions.payload;
            } else {
                state.isLogined = !state.isLogined;
            }
        },
        saveUserLogin(state, actions) {
            state.userData = actions.payload;
        },
    },
});

export default userSlice;
