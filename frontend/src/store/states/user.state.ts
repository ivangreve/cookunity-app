import { createSlice } from '@reduxjs/toolkit';
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from '../../utilities';

const initialState = {
    user: {
        name: '',
        email: '',
        image: '',
        role: ''
    },
    token: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: getLocalStorage("user") ? JSON.parse(getLocalStorage("user") as string) : initialState.user,
        token: getLocalStorage("user") ? JSON.parse(getLocalStorage("user") as string) : initialState.token
    },
    reducers: {
        setUser: (state, action) => {
            setLocalStorage('user', action.payload);
            state.user = action.payload;
        },
        setToken: (state, action) => {
            setLocalStorage('token', action.payload);
            state.token = action.payload;
        },
        logout: (state) => {
            deleteLocalStorage('user');
            deleteLocalStorage('token');
            state.user = initialState.user;
            state.token = initialState.token;
        }
    },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;