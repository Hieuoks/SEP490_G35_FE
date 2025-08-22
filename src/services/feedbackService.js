import axios from 'axios';
import { message } from 'antd';
import { getHeader,getHeader2 } from './api';
const BASE_URL = 'http://localhost:5298/api';

export const getAllFeedBack = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Feedback/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách feedback:', error);
    message.error('Không thể tải danh sách feedback');
    throw error;
  }
};

export const getFeedbackDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Feedback/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID ${id}:`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};


export const createFeedback = async (data) => {
  try {
    // Nếu data là object, chuyển sang FormData
    
    const response = await axios.post(`${BASE_URL}/Feedback`, data, {
      headers: getHeader2(), // Không cần set Content-Type nếu dùng FormData
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo feedback:', error);
    message.error('Không thể tạo feedback');
    throw error;
  }
};
export const reportFeedback = async (data) => {
  try {
   
    
    const response = await axios.post(`${BASE_URL}/Feedback/report`, data, {
      headers: getHeader(), // Không cần set Content-Type nếu dùng FormData
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo feedback:', error);
    message.error('Không thể tạo feedback');
    throw error;
  }
};
export const updateFeedback = async (id,data) => {
  try {

    const response = await axios.put(`${BASE_URL}/Feedback/${id}`, data, {
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
export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Feedback/${id}`, {
      headers: getHeader2(),
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi xóa tour ID ${id}:`, error);
    message.error('Không thể xóa tour');
    throw error;
  }
};