// import { configureStore } from "@reduxjs/toolkit";
// import teamSlice from "../redux/teamSlice/team.slice";
// // import authLoginSlice from "../"
// import loginSlice from "../redux/authSlice/auth.slice";
// import stepperSlice from "../redux/stepperSlice/stepper.slice";

// const store = configureStore({
//     reducer: {
//         teamsDetails: teamSlice,
//         login:loginSlice,
//         stepper:stepperSlice,
//     },
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import teamSlice from "../redux/teamSlice/team.slice";
import loginSlice from "../redux/authSlice/auth.slice";
import stepperSlice from "../redux/stepperSlice/stepper.slice";
import dataRequestSlice from "../redux/dataRequestSlice/dataRequest.slice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

// Combine all your reducers
const rootReducer = combineReducers({
  teamsDetails: teamSlice,
  login: loginSlice,
  stepper: stepperSlice,
  dataRequest: dataRequestSlice
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
