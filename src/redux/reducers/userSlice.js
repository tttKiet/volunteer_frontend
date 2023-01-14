import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogined: false,
    },
    reducers: {
        toggleUserLogin: (state) => {
            state.isLogined = !state.isLogined;
        },
    },
});

export default userSlice;
