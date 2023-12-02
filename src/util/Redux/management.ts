import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            //AsyncStorage.setItem("mywallet", JSON.stringify(state.items))

        },

        deleteItem: (state, action) => {
            const { name } = action.payload;
            const newArr = state.items.filter((item) => item.name !== name)
            state.items = newArr
            //AsyncStorage.setItem("mywallet", JSON.stringify(state.items))
        }
    }
})




export const { addItem, deleteItem } = ManagementSlice.actions;

export const managementState = (state: RootState) => state.management.items

export default ManagementSlice.reducer