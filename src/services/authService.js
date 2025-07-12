import axios from 'axios';
import { message } from 'antd';

const BASE_URL = 'http://localhost:5298/api'
export const register = async (userName, email, password, address,phoneNumber) => {
  let data = JSON.stringify({
  "userName": userName,
  "email": email,
  "password": password,
  "address": address,
  "phoneNumber": phoneNumber,
  "avatar": "string",
  "roleName": "Customer"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${BASE_URL}/Auth/register`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

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
