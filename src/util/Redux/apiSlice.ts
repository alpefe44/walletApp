import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, deleteItem } from '../DatabaseActions/databaseactions'; // Bu dosyada API çağrılarınızı gerçekleştiren bir modül bulunmalıdır
import { useDispatch } from 'react-redux';

// Asenkron işlemi tanımla
export const fetchItems = createAsyncThunk('data/fetchItems', async (username: string) => {
    const response = await getItems(username);
    //console.log(response)
    return response; // response.data değil, tüm response'ı kullanıyoruz
});




// Slice'ı tanımla
const dataSlice = createSlice({

    name: 'data',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        price : 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // action.payload içinde response var

                const newPrice = state.items.reduce((sum, item) => sum + item.price, 0);
                state.price = newPrice
            
             
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;