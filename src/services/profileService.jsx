import axios from 'axios';
import Cookies from 'js-cookie';

const userId = Cookies.get('userId');
const BASE_URL = 'https://localhost:7012/api';
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Profile/ViewProfile/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'userId': userId
      }
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const updateProfile = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/Profile/UpdateProfile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT'
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};