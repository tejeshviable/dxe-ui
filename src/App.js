// import React from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
// import store from "./root/store";
// import Login from "./pages/login";
// import MainLayout from "./MainLayout";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './Global.css'
// import DashboardCard from "./pages/dashboard";
// import NewCampaign from "./pages/NewCampaign/Sections/NewCampaign";
// import CreateCampaign from "./components/stepper";
// import AnalyticsPage from "./pages/analytics";
// import CampaignList from "./pages/campaignList";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <ToastContainer />
//         <Routes> {/* Updated usage */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Login />} />

//           <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<DashboardCard />} />
//           <Route path="/analytics" element={<AnalyticsPage />} />
//           <Route path="/campaign-list" element={<CampaignList />} />
//           <Route path="/create-campaign" element={<CreateCampaign />} />
//           </Route>
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import store, { persistor } from "./root/store"; // Import persistor
import Login from "./pages/login";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Global.css";
import DashboardCard from "./pages/dashboard";
import CreateCampaign from "./components/stepper";
import AnalyticsPage from "./pages/analytics";
import CampaignList from "./pages/campaignList";
import ContentLibrary from "./pages/ContentLibrary/ContentLibrary";
import DataRequest from "./pages/DataRequest";
import NotificationPreview from "./pages/NotificationPreview/NotificationPreview";
import NotFound from "./pages/notFound";
import ViewDataRequest from "./pages/DataRequest/Components/ViewDataRequest";
import DataPermission from "./pages/DataPermission/DataPermission";
import DataRequestTest from "./pages/DataRequest/Components/DataRequestTest";
import ForgotPassword from "./pages/forgotPassword";
import Demopage from "./pages/DemoPage/Demopage";

// Create a function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("idToken"); // Check for token or your method of authentication
  return !!token; // Returns true if token exists
};

// Create PrivateRoute component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state has been rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastContainer />
          <Routes>
            {" "}
            {/* Updated usage */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Protect the MainLayout routes */}
            <Route element={<PrivateRoute element={<MainLayout />} />}>
              <Route path="/dashboard" element={<DashboardCard />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/campaign-list" element={<CampaignList />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/content-library" element={<ContentLibrary />} />
              <Route path="/data-request" element={<DataRequest />} />
              <Route path="/notification-preview" element={<NotificationPreview />} />
              <Route path="/viewDataRequest" element={<ViewDataRequest/>}/>
              <Route path="/data-permission" element={<DataPermission/>}/>
              <Route path="/data-request-test" element={<DataRequestTest/>}/>
              <Route path="/demo-page" element={<Demopage/>}/>
            </Route>
            {/* Add NotFound route for any undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
