import axiosInstance from "../../components/utils/axiosInstance";
import { toast } from "react-toastify";


export const fetchDataRequestUpdateThunk = async (data) => {

    try {
        const token = localStorage.getItem("idToken");

        if (!token) {
            toast.error("Unauthorized access.");
        }

        const response = await axiosInstance.put(
            `api/dr/dataRequest/update/Status?requestId=${data.requestId}&status=${data.status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data

    } catch (error) {

        return toast.error(error.response.data.message);
    }
}


export const fetchDataRequestViewThunk = async (data) => {

    try {

        const token = localStorage.getItem("idToken");

        if (!token) {
            toast.error("Unauthorized access.");
        }

        const response = await axiosInstance.get(
            `api/dr/dataRequest/view/${data.requestId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        return toast.error(error.response.data.message);
    }
}

export const fetchDataRequestStatusThunk = async (page) => {
    try {
        const idToken = localStorage.getItem("idToken");

        if (!idToken) {
            toast.error("Unauthorized access. Please log in.");
        }

        const response = await axiosInstance.get(`api/dr/dataRequest/Status/${page.status}`, {
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
