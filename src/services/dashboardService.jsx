import axios from 'axios';
import Cookies from 'js-cookie';
import { getHeader } from './api';

const BASE_URL = 'http://localhost:5298/api';
export const getTotalTour = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/DashBoardOperator/total-tours`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total tour:', error);
        throw error;
    }
}
export const getTotalBooking = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/DashBoardOperator/total-bookings`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total booking:', error);
        throw error;
    }
}
export const getTotalEarnings = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/DashBoardOperator/total-earnings`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total earnings:', error);
        throw error;
    }
}
export const getTotalReviews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/DashBoardOperator/total-feedbacks`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total reviews:', error);
        throw error;
    }
}
export const getlastestInvoices = async (count) => {
    try {
        const response = await axios.get(`${BASE_URL}/DashBoardOperator/latest-invoices?count=${count}`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching latest invoices:', error);
        throw error;
    }
}
