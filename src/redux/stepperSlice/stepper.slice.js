import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPrimarySelectThunk,
  fetchPrimaryhOptionsThunk,
  fetchSecondarySelectThunk,
  fetchSecondaryOptionsThunk,
  fetchDiscoverIdThunk,
  fetchContentListThunk,
  fetchCreateCampaignThunk,
  fetchCreatePostRequestThunk
} from "./stepper.thunk";

 
export const fetchPrimarySelectSlice = createAsyncThunk(
  "fetchPrimarySelect",
  fetchPrimarySelectThunk
);
export const fetchPrimaryOptionsSlice = createAsyncThunk(
  "fetchPrimaryOptions",
  fetchPrimaryhOptionsThunk
);
 
export const fetchSecondarySelectSlice = createAsyncThunk(
  "fetchSelectVal",
  fetchSecondarySelectThunk
);
export const fetchSecondaryOptionsSlice = createAsyncThunk(
  "fetchSecondaryOptions",
  fetchSecondaryOptionsThunk
);
 
export const fetchDiscoverIdSlice = createAsyncThunk(
  "fetchDiscoverId",
  fetchDiscoverIdThunk
);

export const fetchContentListSlice = createAsyncThunk('fetchContentList', fetchContentListThunk);
 
export const fetchCreateCampaignSlice = createAsyncThunk('fetchCreateCampaign',fetchCreateCampaignThunk)
 
export const fetchCreateDataRequestSlice = createAsyncThunk('fetchCreateDataRequest', fetchCreatePostRequestThunk);
 
const initialState = {
  primary: [],
  secondary: [],
  primaryOption: {},
  secondaryOptions: {},
  totalItems: 0,
  data: null,
  status: "idle",
  loading: false,
  error: null,
  listContentData: [],
    createCampaignResponse:{},
    createDataRequestReponse:{},
  discoverFields: [], // Add discoverFields to the initial state
  socketCountsData:{}
};
 
const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setDiscoverFields: (state, action) => {
      state.discoverFields = action.payload; // Update discoverFields state
    },
    socketCounts:(state,action)=>{
        state.socketCountsData = {
            ...state.socketCountsData, // Keep previous counts
            ...action.payload,         // Add or update the new socket data
          };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Primary Attributes
      .addCase(fetchPrimarySelectSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrimarySelectSlice.fulfilled, (state, action) => {
        state.primary = action.payload; // Store the fetched primary attributes
        state.loading = false;
      })
      .addCase(fetchPrimarySelectSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
 
      .addCase(fetchPrimaryOptionsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrimaryOptionsSlice.fulfilled, (state, action) => {
        const { attributeCode, data } = action.payload;
        state.loading = false;
        state.primaryOption = {
          ...state.primaryOption,
          [attributeCode]: data,
        };
      })
      .addCase(fetchPrimaryOptionsSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSecondarySelectSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecondarySelectSlice.fulfilled, (state, action) => {
        state.secondary = action.payload; // Store the fetched secondary attributes
        state.loading = false;
      })
      .addCase(fetchSecondarySelectSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSecondaryOptionsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecondaryOptionsSlice.fulfilled, (state, action) => {
        const { attributeCode, data } = action.payload;
        state.loading = false;
        state.secondaryOptions = {
          ...state.secondaryOptions,
          [attributeCode]: data,
        };
      })
      .addCase(fetchSecondaryOptionsSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Content List
 
      .addCase(fetchContentListSlice.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchContentListSlice.fulfilled, (state, action) => {
        console.log("action----",action);
        state.listContentData = action.payload.content;
        state.totalItems = action.payload.totalElements;
        state.loading = false;
    })
    .addCase(fetchContentListSlice.rejected, (state, action) => {
        state.error = action?.error?.message;
        state.loading = false;
    })

    // Create Campaign

    .addCase(fetchCreateCampaignSlice.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchCreateCampaignSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createCampaignResponse = action.payload;
    })
    .addCase(fetchCreateCampaignSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    })

    .addCase(fetchCreateDataRequestSlice.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchCreateDataRequestSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createDataRequestReponse = action.payload;
    })
    .addCase(fetchCreateDataRequestSlice.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    })
      ;
  },
});
 
export const { setDiscoverFields,socketCounts } = stepperSlice.actions; // Export the new action
 
export default stepperSlice.reducer;