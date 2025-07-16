import axios from 'axios';
import Cookies from 'js-cookie';

const userId = Cookies.get('userId');
export const getPackages = async () => {
    try {
    const response = await axios.get(`https://localhost:7012/api/ServicePackage/ListAllServicePackage`,  {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
}

export const updatePackage = async (formData) => {
  try {
    const response = await axios.put(`https://localhost:7012/api/ServicePackage/UpdateServicePackage`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT'
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
}

export const deletePackage = async (packageId) => {
  try {
    const response = await axios.delete(`https://localhost:7012/api/ServicePackage/SoftDeleteServicePackage/${packageId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
}

export const createPackage = async (formData) => {
  try {
    const response = await axios.post(`https://localhost:7012/api/ServicePackage/CreateServicePackage`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
}