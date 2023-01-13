import { createSlice } from '@reduxjs/toolkit';
import actionTypes from '../actions/actionType';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggined: 'false',
    },
    reducers: {
        [actionTypes.TOGGLE_USER_LOGGIN]: (state) => {
            return (state.isLoggined = !state.isLoggined);
        },
    },
});

export default userSlice;
