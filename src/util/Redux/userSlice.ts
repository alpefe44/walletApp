import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    profile: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.profile.push(action.payload)
            console.log(state.profile , "stateprofile")
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

