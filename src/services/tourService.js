import axios from 'axios';
import { message } from 'antd';

const BASE_URL = 'http://localhost:5298/api';

export const getTour = async (page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/ListAllToursPaging?pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const searchTour = async (keyword,page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/Search Tour By Name?keyword=${keyword}&pageNumber=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const filterTour = async (title,type,transportation,startPoint,minPrice,maxPrice,page=1, pageSize=6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Tour/FilterToursPaging?title=${title}&tourType=${type}&transportation=${transportation}&startPoint=${startPoint}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${page}&pageSize=${pageSize}`);
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
