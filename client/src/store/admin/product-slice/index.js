import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
};

export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
        const result = await axios.post(
            'https://mern-projects-nieh.onrender.com/api/admin/products/add',
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return result?.data;
    }
);

export const fetchAllProduct = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
        const result = await axios.get(
            'https://mern-projects-nieh.onrender.com/api/admin/products/get'
        );

        return result?.data;
    }
);

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        const result = await axios.put(
            `https://mern-projects-nieh.onrender.com/api/admin/products/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(
            `https://mern-projects-nieh.onrender.com/api/admin/products/delete/${id}`
        );

        return result?.data;
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
            });
    },
});

export default AdminProductsSlice.reducer;