import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
import Cookies from 'js-cookie';
const BASE_URL = 'https://localhost:7012/api';
const userId = Cookies.get('userId');

export const getTourGuides = async (keyword,pageNumber,pageSize) => {
    try {
        const response = await axios.get(`${BASE_URL}/TourOperator/tourguides`, {
            params: {
                Username: keyword,
                IsActive: true,
                
                PageNumber: pageNumber,
                PageSize: pageSize
            },
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tour guides:', error);
        message.error('Failed to fetch tour guides');
        throw error;
    }
}
export const getAllTourGuides = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/TourOperator/tourguides`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tour guides:', error);
        message.error('Failed to fetch tour guides');
        throw error;
    }
}
export const deleteTourGuide = async (tourGuideId) => {
    try {
        const response = await axios.put(`${BASE_URL}/TourOperator/tourguide-status`,{
            tourGuideId: tourGuideId,
            isActive: false,
        } ,{
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting tour guide:', error);
        message.error('Failed to delete tour guide');
        throw error;
    }
}
export const addTourGuide = async (tourGuideData) => {
    try {
        const response = await axios.post(`${BASE_URL}/TourOperator/register-tourguide`, tourGuideData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error adding tour guide:', error);
        message.error(error.response?.data?.message || 'Failed to add tour guide');
        throw error;
    }
}

