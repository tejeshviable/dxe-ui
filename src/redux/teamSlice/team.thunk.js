import axiosInstance from "../../components/utils/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

export const fetchTeamsDetailsThunk = async (page, rowsPerPage) => {
  try {
    const token = localStorage.getItem("idToken");
    console.log("idToken", token);
    if (!token) {
      toast.error("Unauthorized access. Please log in.");
    }
    const response = await axiosInstance.get("api/cm/campaign/list", {
      params: {
        pageNumber: page?.page,
        pageSize: page?.rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("error", error.response.data.message);
  }
};

export const fetchTeamMemberListThunk = async () => {
  try {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      toast.error("Unauthorized access. Please log in.");
    }

    const response = await axiosInstance.get("user/organization", {
      method: "GET", // method
      headers: {
        Authorization: `Bearer ${idToken}`, // Pass the token in the Authorization header
        //   "Content-Type": "application/json", // Optional
      },
    });
    // const data = await response.json();

    return response.data;
  } catch (error) {
    console.error("Error fetching team member list:", error);
  }
};

export const fetchDataRequestDataThunk = async (page, rowsPerPage) => {
  try {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      toast.error("Unauthorized access. Please log in.");
    }

    const response = await axiosInstance.get("api/dr/dataRequest", {
      params: {
        pageNumber: page?.page,
        pageSize: page?.rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("error", error.response.data.message);
  }
};

// Thunk for fetching notifications
export const fetchNotificationsThunk =
  (pageNumber, pageSize) => async (dispatch) => {
    try {
      const token = localStorage.getItem("idToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.");
        return;
      }

      const response = await axiosInstance.get(
        "/api/cm/user-notification/orgId",
        {
          params: {
            pageNumber,
            pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch notifications"
      );
      console.error("Notification fetch error:", error);
    }
  };

// Thunk for fetching notifications

export const fetchNotificationPreviewThunk = async (page) => {
  try {
    const token = localStorage.getItem("idToken");
    if (!token) {
      toast.error("Unauthorized access. Please log in.");
      return;
    }

    const response = await axiosInstance.get(
      "/api/cm/user-notification/orgId",
      {
        params: {
          pageNumber: page?.page,
          pageSize: page?.rowsPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch notifications"
    );
    console.error("Notification fetch error:", error);
  }
};

export const fetchCampaignListDeleteThunk = async (data) => {
  try {
    const token = localStorage.getItem("idToken");

    if (!token) {
      toast.error("Unauthorized access.");
    }

    const response = await axiosInstance.delete(`api/cm/campaign/delete`, {
      params: {
        campaignId: data.campaignId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
};

export const fetchCampaignDetailsThunk = async (id) => {
  try {
    const token = localStorage.getItem("idToken");

    if (!token) {
      toast.error("Unauthorized access.");
    }
    const response = await axiosInstance.get(`/api/cm/campaign/${id}`, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    // const data = await response.json();

    return response.data;
  } catch (error) {
    console.error("Error fetching team member list:", error);
  }
};


export const NotificationApproveThunk = async (data) => {
  try {
    const token = localStorage.getItem("idToken");

    if (!token) {
      toast.error("Unauthorized access.");
    }

    const response = await axiosInstance.post(
      `api/ecomm/trigger/intersection/data?id=${data.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Successfully Executed");
    return response.data;
  } catch (error) {
    return toast.error(error?.response?.data?.error);
  }
};

export const fetchDataPermissionThunk = async (data) => {

  try {
    const token = localStorage.getItem("idToken");

    if (!token) {
      toast.error("Unauthorized access.");
    }

    const response = await axiosInstance.post(`api/dxe/discovery/discover/details`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data


  } catch (error) {
    return toast.error(error?.response?.data?.error);
  }
}

export const fetchDataPermissonUnionThunk = async (data) => {

  try {

    const token = localStorage.getItem("idToken");
    if (!token) {
      toast.error("Unauthorized access. Please log in.");
      return;
    }

    const response = await axiosInstance.get(
      `api/uc/union/${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;


  } catch (error) {
    return toast.error(error?.response?.data?.error);

  }
}

export const fetchPastRequestThunk = async (data) => {

  try {
    const token = localStorage.getItem("idToken");

    if (!token) {
      toast.error("Unauthorized access. Please log in.");
    }
    const response = await axiosInstance.get(
      `api/attributes/list`,
      {
        params: {
          pageNumber: data?.page,
          pageSize: data?.rowsPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("error", error.response.data.message);
  }
}


// For Demo Purpose 

export const fetchIpiFicationPostThunk = async (data) => {

  try {
    const initialResponse = await axios.post(
      `http://3.238.201.69:7035/api/v1/ipification/generateUrl`,
      data,
      { validateStatus: null }
    );
  
    // if (initialResponse.status === 302 && initialResponse.headers.location) {
    //   const redirectResponse = await axios.get(initialResponse.headers.location);
    //   return redirectResponse.data;
    // }

    console.log("Redirecting to:", initialResponse.data);

    return initialResponse.data;


  } catch (error) {
    return toast.error(error?.response?.data?.error);
  }
}

export const fetchIpiFicationGetThunk = async (data) => {
  console.log("dataaa---", data);
  try {
    const response = await axios.get(`http://3.238.201.69:7035/api/v1/ipification/status/${data.mobileNumber}`);
 
    return response.data
 
 
  } catch (error) {
    return toast.error(error?.response?.data?.error);
  }
}

export const fetchIpiFicationRespPostThunk = async (data) => {

  try {
    // const response = await axios.get(`${data?.redirectionUrl}`, data?.urlData);
    // const response = await axios.get('https://api.stage.ipification.com/auth/realms/ipification/protocol/openid-connect/auth?response_type=code&redirect_uri=https://34.54.18.161.nip.io/ipification/api/v1/ipification/callback&client_id=5b4dcd2613944553b42124ab6d481619&scope=openid%20ip:phone_verify&state=1d445106-a87f-4c26-9e4c-9304b98eab54&login_hint=999123456789');
    // console.log("resp-----",response)
    // return response.data
    // window.open(data?.redirectionUrl, "_blank", "noreferrer");

  } catch (error) {
    return toast.error(error?.response?.data?.error);
  }
}

