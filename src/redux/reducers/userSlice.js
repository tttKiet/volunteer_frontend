import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogined: true,
        userData: {
            ms: 'B2014754',
            email: 'kietb2014754@gmail.com',
            name: 'Bui Tuan Kiet',
        },
    },
    reducers: {
        toggleUserLogin: (state) => {
            state.isLogined = !state.isLogined;
        },
    },
});

export default userSlice;
