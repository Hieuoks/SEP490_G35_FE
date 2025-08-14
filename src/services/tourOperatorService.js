import axios from 'axios';
import { message } from 'antd';

const BASE_URL = 'https://localhost:7012/api';

export const getTourOp = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/TourOperator?pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};

export const getTourOpDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/TourOperator/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID ${id}:`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};
export const createTourOperator = async (tourOperatorData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/TourOperator`,
      tourOperatorData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo tour operator:', error);
    throw error;
  }
};
export const updateTourOperator = async (id, tourOperatorData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/TourOperator/${id}`,
      tourOperatorData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi cập nhật tour operator:', error);
    throw error;
  }
};
