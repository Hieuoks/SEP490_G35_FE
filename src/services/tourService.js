import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
import Cookies from 'js-cookie';
const BASE_URL = 'https://localhost:7012/api';
const userId = Cookies.get('userId');
export const getTour = async (page = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/listAllToursForUserPaging?pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const searchTour = async (keyword, page = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/Search Tour By Name?keyword=${keyword}&pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const filterTour = async (title, type, transportation, startPoint, minPrice, maxPrice, page = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/Filter Tours Paging For Customer?title=${title}&tourType=${type}&transportation=${transportation}&startPoint=${startPoint}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const getTourDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/Tour Detail For Customer/${id}`, {
      headers: getHeader()});
    return response.data;
  } catch (error) {
    console.error(`Lỗi lấy thông tin chi tiết tour operator ID ${id}:`, error);
    message.error('Không thể tải chi tiết tour operator');
    throw error;
  }
};
export const createTour = async (formData) => {
  try {
    // formData là instance của FormData đã được build từ form
    const response = await axios.post(`${BASE_URL}/Tour/CreateTour`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo tour:', error);
    message.error('Không thể tạo tour');
    throw error;
  }
};
export const updateTour = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/Tour/UpdateTour`, formData, {

      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi cập nhật tour:', error);
    message.error('Không thể cập nhật tour');
    throw error;
  }
};

export const getTourByoperator = async (keyword, pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/Search Tour Paging By Name For Tour Operator/${userId}`, {
      params: {
        userid: userId,
        keyword: keyword,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
}
