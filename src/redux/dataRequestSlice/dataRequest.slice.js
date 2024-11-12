import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataRequestStatusThunk, fetchDataRequestUpdateThunk, fetchDataRequestViewThunk } from "./dataRequest.thunk";


export const fetchDataRequestUpdateSlice = createAsyncThunk("fetchPrimarySelect", fetchDataRequestUpdateThunk);

export const fetchDataRequestViewSlice = createAsyncThunk("fetchDataRequestSlice", fetchDataRequestViewThunk);

export const fetchDataRequestStatusSlice = createAsyncThunk("fetchDataRequestStatusThunk", fetchDataRequestStatusThunk);

const initialState = {
    dataRequest:{},
    viewDataRequestData:{},
    dataRequestStatusData:[],
    status: "idle",
    loading: false,
    error: null,
};


const dataRequestSlice = createSlice({

    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchDataRequestUpdateSlice.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchDataRequestUpdateSlice.fulfilled, (state, action) => {
            state.dataRequest = action.payload;
            state.loading = false;
          })
          .addCase(fetchDataRequestUpdateSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          .addCase(fetchDataRequestViewSlice.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchDataRequestViewSlice.fulfilled, (state, action) => {
            state.viewDataRequestData = action.payload;
            state.loading = false;
          })
          .addCase(fetchDataRequestViewSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // View Data Request Status Data

          .addCase(fetchDataRequestStatusSlice.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchDataRequestStatusSlice.fulfilled, (state, action) => {
            state.dataRequestStatusData = action.payload;
            state.totalItems = action.payload.totalElements;
            state.loading = false;
          })
          .addCase(fetchDataRequestStatusSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    },
})

export default dataRequestSlice.reducer;