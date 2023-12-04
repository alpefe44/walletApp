import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.profile = { ...action.payload }

        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

