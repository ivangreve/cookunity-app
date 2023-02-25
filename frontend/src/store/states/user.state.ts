import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: undefined
})

