import axios from 'axios';
import Cookies from 'js-cookie';

const userId = Cookies.get('userId');
const BASE_URL = 'http://localhost:5298/api'
export const getPackages = async () => {
    try {
    const response = await axios.get(`${BASE_URL}/ServicePackage/ListAllServicePackageForAdmin`,  {
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
    const response = await axios.put(`${BASE_URL}/ServicePackage/UpdateServicePackage`, formData, {
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
    const response = await axios.delete(`${BASE_URL}/ServicePackage/SoftDeleteServicePackage/${packageId}`, {
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
    const response = await axios.post(`${BASE_URL}/ServicePackage/CreateServicePackage`, formData, {
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

export const updatePackageStatus = async (packageId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/ServicePackage/ToggleServicePackageStatus/${packageId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH'
    });
    // Trả về dữ liệu (ví dụ: token)
    return response.data;
  } catch (error) {
    // Ném lỗi để component gọi xử lý tiếp
    throw error.response?.data || error;
  }
}

export const checkpackage = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/ServicePackage/CheckSlotTourOperatorPackageService/${userId}`, {
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