import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'https://localhost:7012/api';

export const getTourOpPaymentHistory = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/AdminDashBoard/ViewAllTourOperatorPaymentHistory?pageNumber=${page}&pageSize=${pageSize}`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};

export const getAccount = async (page=1, pageSize=9999) => {
  try {
    const response = await axios.get(`${BASE_URL}/AdminDashBoard/PagingAllAccount?pageNumber=${page}&pageSize=${pageSize}`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const getTourAdmin= async (page=1, pageSize=9999) => {
  try {
    const response = await axios.get(`${BASE_URL}/AdminDashBoard/ListAllToursPaging?pageNumber=${page}&pageSize=${pageSize}`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const getBookingAdmin= async (page=1, pageSize=9999) => {
  try {
    const response = await axios.get(`${BASE_URL}/Booking/admin`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const getFeedbackAdmin= async (page=1, pageSize=9999) => {
  try {
    const response = await axios.get(`${BASE_URL}/Feedback/admin`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};

