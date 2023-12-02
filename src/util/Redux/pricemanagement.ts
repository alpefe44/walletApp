import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'



interface PriceState {
    price: number
}


const initialState: PriceState = {
    price: 0
}


export const priceManagementSlice = createSlice({
    name: "priceSlice",
    initialState,
    reducers: {
        editPrice: (state, action) => {
            state.price = action.payload;
        }
    }
})


export const { editPrice } = priceManagementSlice.actions;
export default priceManagementSlice.reducer;