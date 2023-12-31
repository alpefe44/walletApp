import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'





interface ManagementState {
    items: Array<any>
}

const initialState: ManagementState = {
    items: []
}




export const ManagementSlice = createSlice({
    name: "management",
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (state.items.length <= 0) {
                state.items.push(action.payload)
            } else {
                const newArr = state.items.filter((item) => item.name !== action.payload.name);
                newArr.push(action.payload)
                state.items = [...newArr];
            }

        },

        deleteItem: (state, action) => {
            const { name } = action.payload;
            const newArr = state.items.filter((item) => item.name !== name)
            state.items = newArr
        },

        setItem: (state, action) => {
            state.items = [...action.payload]
        }
    }
})




export const { addItem, deleteItem , setItem } = ManagementSlice.actions;

export const managementState = (state: RootState) => state.management.items

export default ManagementSlice.reducer