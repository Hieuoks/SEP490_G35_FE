import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'http://localhost:5298/api'
export const register = async (userName, email, password, address, phoneNumber, avatar, roleName) => {
  let data = JSON.stringify({
    userName,
    email,
    password,
    address,
    phoneNumber,
    avatar: avatar || "string",
    roleName: roleName || "Customer"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/Auth/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const login = async (email, password) => {
  try {

    const response = await axios.post(`${BASE_URL}/Auth/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const forgotPassword = async (email) => {
  try {

    const response = await axios.post(`${BASE_URL}/Auth/forgot-password`, {
      email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const resetPassword = async (token, password) => {
  try {

    const response = await axios.post(`${BASE_URL}/Auth/reset-password`, {
      token,
      newPassword: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const verifyAccount = async (token) => {
  try {

    const response = await axios.post(`${BASE_URL}/Auth/verify-email`, {
      token
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const resendVerification = async (email) => {
  try {

    const response = await axios.post(`${BASE_URL}/Auth/resend-verification`, {
      email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
};
export const getOperatorID = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/TourOperator/user-operator`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};