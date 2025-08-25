import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'https://localhost:7012/api';

export const getNotification = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Notification`,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách thông báo:', error);
    message.error('Không thể tải danh sách thông báo');
    throw error;
  }
};

export const marksRead = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/Notification/${id}/mark-read`,null,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID ${id}:`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};

export const marksAllRead = async () => {
  try {
    const response = await axios.put(`${BASE_URL}/Notification/mark-all-read`,null,{
        headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};