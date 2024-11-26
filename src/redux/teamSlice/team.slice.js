import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataPermissionThunk, fetchDataPermissonUnionThunk, fetchDataRequestDataThunk, fetchIpiFicationAuthPostThunk, fetchIpiFicationGetThunk, fetchIpiFicationPostThunk, fetchIpiFicationRespPostThunk, fetchNotificationPreviewThunk, fetchPastRequestThunk, fetchTeamMemberListThunk, fetchTeamsDetailsThunk, NotificationApproveThunk, VerifysmsOtpThunk, VerifyWhatsAppOtpThunk } from "./team.thunk";

export const fetchTeamsDetailsSlice = createAsyncThunk(
  "fetchTeamsDetails",
  fetchTeamsDetailsThunk
);
export const fetchTeamMemberListSlice = createAsyncThunk(
  "fetchTeamMemberListThunk",
  fetchTeamMemberListThunk
);

export const fetchDataRequestDataSlice = createAsyncThunk(
  "fetchDataRequestDataThunk",
  fetchDataRequestDataThunk
);

export const fetchNotificationPreviewSlice = createAsyncThunk(
  "fetchNotificationPreviewThunk",
  fetchNotificationPreviewThunk
)

export const fetchNotificationApproveSlice = createAsyncThunk(
  "NotificationApproveThunk",
  NotificationApproveThunk
)

export const fetchDataPermissionSlice = createAsyncThunk(
  "fetchDataPermissionThunk",
  fetchDataPermissionThunk
)

export const fetchDataPermissonUnionSlice = createAsyncThunk(
  "fetchDataPermissonUnionThunk",
  fetchDataPermissonUnionThunk
)

export const fetchPastRequestSlice = createAsyncThunk(
  "fetchPastRequestThunk",
  fetchPastRequestThunk
)

export const fetchIpiFicationPostSlice = createAsyncThunk(
  "fetchIpiFicationPostThunk",
  fetchIpiFicationPostThunk
)

export const fetchIpiFicationGetSlice = createAsyncThunk(
  "fetchIpiFicationGetThunk",
  fetchIpiFicationGetThunk
)

export const fetchIpiFicationRespPostSlice = createAsyncThunk(
  "fetchIpiFicationRespPostThunk",
  fetchIpiFicationRespPostThunk
)

export const fetchIpiFicationAuthPostSlice = createAsyncThunk(
  "fetchIpiFicationAuthPostThunk",
  fetchIpiFicationAuthPostThunk
)

export const VerifysmsOtpSmsSlice = createAsyncThunk(
  "VerifysmsOtpThunk",
  VerifysmsOtpThunk
)

export const VerifyWhatsAppOtpSlice = createAsyncThunk(
  "VerifyWhatsAppOtpThunk",
  VerifyWhatsAppOtpThunk
)

const initialState = {
  teams: [],
  campaigns: [],
  dataRequest: [],
  notificationApprove:'',
  totalItems: 0,
  notificationPreview: {},
  dataPermissionData:'',
  dataPermissionUnionData:'',
  pastRequestData:[],
  ipificationAuthPostSlice:{},
  smsotp:'',
  whatsAppOtp:'',
  demoPost:'',
  demoGet:'',
  demorespData:'',
  data: null,
  status: "idle",
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsDetailsSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamsDetailsSlice.fulfilled, (state, action) => {
        state.campaigns = action.payload?.content;
        state.totalItems = action.payload?.totalElements;
        state.loading = false;
      })
      .addCase(fetchTeamsDetailsSlice.rejected, (state, action) => {
        state.error = action?.error?.message;
        state.loading = false;
      })

      // fetching team member list
      .addCase(fetchTeamMemberListSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMemberListSlice.fulfilled, (state, action) => {
        console.log(action.payload, "slice");
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamMemberListSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Data Request

      .addCase(fetchDataRequestDataSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataRequestDataSlice.fulfilled, (state, action) => {
        state.dataRequest = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataRequestDataSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Notification Preview Data 

      .addCase(fetchNotificationPreviewSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationPreviewSlice.fulfilled, (state, action) => {
        state.notificationPreview = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotificationPreviewSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchNotificationApproveSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationApproveSlice.fulfilled, (state, action) => {
        state.notificationApprove = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotificationApproveSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Data Permission

      .addCase(fetchDataPermissionSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPermissionSlice.fulfilled, (state, action) => {
        state.dataPermissionData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataPermissionSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Data Permission Union

      .addCase(fetchDataPermissonUnionSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPermissonUnionSlice.fulfilled, (state, action) => {
        state.dataPermissionUnionData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataPermissonUnionSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Past Request 

      .addCase(fetchPastRequestSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastRequestSlice.fulfilled, (state, action) => {
        state.pastRequestData = action.payload;
        state.totalItems = action.payload.totalElements;
        state.loading = false;
      })
      .addCase(fetchPastRequestSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      // Demo

      .addCase(fetchIpiFicationPostSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIpiFicationPostSlice.fulfilled, (state, action) => {
        state.demoPost = action.payload;
        state.loading = false;
      })
      .addCase(fetchIpiFicationPostSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchIpiFicationGetSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIpiFicationGetSlice.fulfilled, (state, action) => {
        state.demoGet = action.payload;
        state.loading = false;
      })
      .addCase(fetchIpiFicationGetSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchIpiFicationRespPostSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIpiFicationRespPostSlice.fulfilled, (state, action) => {
        state.demorespData = action.payload;
        state.loading = false;
      })
      .addCase(fetchIpiFicationRespPostSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Auth

      .addCase(fetchIpiFicationAuthPostSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIpiFicationAuthPostSlice.fulfilled, (state, action) => {
        state.ipificationAuthPostSlice = action.payload;
        state.loading = false;
      })
      .addCase(fetchIpiFicationAuthPostSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SMS Otp

      .addCase(VerifysmsOtpSmsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifysmsOtpSmsSlice.fulfilled, (state, action) => {
        state.smsotp = action.payload;
        state.loading = false;
      })
      .addCase(VerifysmsOtpSmsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // WhatsApp Otp

      .addCase(VerifyWhatsAppOtpSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyWhatsAppOtpSlice.fulfilled, (state, action) => {
        state.whatsAppOtp = action.payload;
        state.loading = false;
      })
      .addCase(VerifyWhatsAppOtpSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default teamsSlice.reducer;
