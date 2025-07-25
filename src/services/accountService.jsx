import axios from 'axios';
import Cookies from 'js-cookie';

const userId = Cookies.get('userId');
const BASE_URL = 'https://localhost:7012/api';

export const getAccounts = async (keyword,pageNumber,pageSize) => {

    try {
        const params = {
            pageNumber: pageNumber || 1,
            pageSize: pageSize || 5,
        };
        if (keyword.length > 0) {
            params.keyword = keyword;
        }
        const response = await axios.get(`${BASE_URL}/Account/PagingSearchAccount`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
        params: params
        });
        // Trả về dữ liệu (ví dụ: token)
        return response.data;
    } catch (error) {
        // Ném lỗi để component gọi xử lý tiếp
        throw error.response?.data || error;
    }
}

export const updateStatusAccount = async (userid,isActive) => {
    try {
        const response = await axios.put(`${BASE_URL}/Account/UpdateStatus`, {
            userId: userid,
            isActive: isActive
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        });
        // Trả về dữ liệu (ví dụ: token)
        return response.data;
    } catch (error) {
        // Ném lỗi để component gọi xử lý tiếp
        throw error.response?.data || error;
    }
}