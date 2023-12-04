import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'



interface PriceState {
    price: number,
    totalPrice: number
}


const initialState: PriceState = {
    price: 0,
    totalPrice: 0
}


export const priceManagementSlice = createSlice({
    name: "priceSlice",
    initialState,
    reducers: {
        editPrice: (state, action) => {
            state.price = action.payload;
        },
        editTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        }
    }
})


export const { editPrice, editTotalPrice } = priceManagementSlice.actions;
export default priceManagementSlice.reducer;