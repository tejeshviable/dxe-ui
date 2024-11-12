import axiosInstance from '../../components/utils/axiosInstance';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchPrimarySelectThunk = async () => {
    try {
        // No need for .json() here; axios automatically parses JSON
        const response = await axiosInstance.get('api/dxe/discovery/attributeMapping/PRIMARY/list');
        return response.data; // Return the parsed data directly
    } catch (error) {
        return toast.error(error.response?.data?.message || 'Error fetching primary select data');
    }
};

export const fetchPrimaryhOptionsThunk = async (attributeCode) => {
    try {
        // Again, no .json() needed
        const response = await axiosInstance.get(`api/dxe/discovery/attribute/${attributeCode}/possibleValues`);
        return { attributeCode, data: response.data }; // Return the parsed data
    } catch (error) {
        console.error(`Error fetching options for ${attributeCode}:`, error);
        return toast.error(error.response?.data?.message || `Error fetching options for ${attributeCode}`);
    }
};

export const fetchSecondarySelectThunk = async () => {
    try {
        const response = await axiosInstance.get('api/dxe/discovery/attributeMapping/list');
        // const data = await response.json();
        return response.data
    } catch (error) {
        console.error('Error fetching attributes:', error);
        return toast.error(error.response.data.message);

    }

}


export const fetchSecondaryOptionsThunk = async (attributeCode) => {
    try {
        const response = await axiosInstance.get(`api/dxe/discovery/attribute/${attributeCode}/possibleValues`);
        // const data = await response.json();
        // return { attributeCode, data };
        return { attributeCode, data: response.data }
    } catch (error) {
        console.error(`Error fetching options for ${attributeCode}:`, error);
        return toast.error(error.response.data.message);

    }

}



export const fetchDiscoverIdThunk = async (data) => {
    try {
        const response = await axiosInstance.post(`api/dxe/discovery/discover`, data, {
            headers: {
                'IC': 'IC'
            }
        });

        return response.data
    } catch (error) {

        return toast.error(error.response.data.message);
    }

}

export const fetchContentListThunk = async (page, rowsPerPage) => {

    console.log("page----", page);

    try {
        const token = localStorage.getItem("idToken");

        if (!token) {
            toast.error("Unauthorized access. Please log in.");
        }
        const response = await axiosInstance.get(
            `api/cm/content/list`,
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
        toast.error(error.response.data.message);
        console.log("error", error.response.data.message);
    }
}


export const fetchCreateCampaignThunk = async (data) => {

    try {
        const token = localStorage.getItem("idToken");

        if (!token) {
            toast.error("Unauthorized access.");
        }

        const response = await axiosInstance.post(`api/cm/campaign/create`, data, {
            headers: {
                    Authorization: `Bearer ${token}`,
                },
        });

        return response.data

    } catch (error) {

        return toast.error(error.response.data.message);
    }
}

export const fetchCreatePostRequestThunk = async (data) => {

    try {
        const token = localStorage.getItem("idToken");

        if (!token) {
            toast.error("Unauthorized access.");
        }

        const response = await axiosInstance.post(`api/dr/dataRequest/create`, data, {
            headers: {
                    Authorization: `Bearer ${token}`,
                },
        });

        return response.data

    } catch (error) {

        return toast.error(error.response.data.message);
    }
}
