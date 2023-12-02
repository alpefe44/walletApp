import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data';



const initialState = {
    data
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
        },
    },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;

