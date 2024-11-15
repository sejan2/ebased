import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
};


export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({ filterParams, sortParams }) => {


        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })


        const result = await axios.get(
            `${process.env.VITE_API_URL}/api/shop/products/get?${query}`
        );

        return result?.data;
    }
);
export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {


        const result = await axios.get(
            `${process.env.VITE_API_URL}/api/shop/products/get/${id}`
        );

        return result?.data;
    }
);
const ShoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload);

            state.isLoading = false
            state.productList = action.payload.data
        })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                console.log(action.payload);

                state.isLoading = false
                state.productList = []
            })
        builder.addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            console.log(action.payload);

            state.isLoading = false
            state.productDetails = action.payload.data
        })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                console.log(action.payload);

                state.isLoading = false
                state.productDetails = []
            })

    },
});
export const { setProductDetails } = ShoppingProductsSlice.actions;
export default ShoppingProductsSlice.reducer;