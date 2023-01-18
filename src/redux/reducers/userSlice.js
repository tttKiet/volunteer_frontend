import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogined: false,
        isManager: false,
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
            state.isManager = actions.payload.type === 'admin' ? true : false;
        },
    },
});

export default userSlice;
