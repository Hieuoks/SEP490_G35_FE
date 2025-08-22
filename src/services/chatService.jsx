import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'https://localhost:7012/api';

export const ChatBotService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/Chatbot`, data, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách :', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};