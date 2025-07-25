import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'http://localhost:5298/api';

export const getTour = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/listAllToursForUserPaging?pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};

export const getTourDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/TourDetail/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID ${id}:`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};
export const createFeedback = async (data) => {
  try {
    
    const response = await axios.post(`${BASE_URL}/Feedback`, data, {
      headers: getHeader(),
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo tour:', error);
    message.error('Không thể tạo tour');
    throw error;
  }
};