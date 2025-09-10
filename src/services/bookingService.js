import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'https://localhost:7012/api';

export const getBookingCustomer = async (page = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/Booking/customer`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách tour operator:', error);
    message.error('Không thể tải danh sách tour operator');
    throw error;
  }
};
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${BASE_URL}/Booking/cancel/${bookingId}`,null, {
      headers: getHeader(),
    });
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
export const createBooking = async (data) => {
  try {

    const response = await axios.post(`${BASE_URL}/Booking`, data, {
      headers: getHeader(),
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo tour:', error);
    message.error('Không thể tạo tour');
    throw error;
  }
};

export const getOperatorBooking = async (UserName) => {
  try {
    if (!UserName) {
      const response = await axios.get(`${BASE_URL}/Booking/tour-operator`, {
        headers: getHeader(),
      });
      return response.data;
    } else {
      const response = await axios.get(`${BASE_URL}/Booking/tour-operator?UserName=${UserName}`, {
        headers: getHeader(),
      });
      return response.data;
    }
  } catch (error) {
    console.error('Lỗi lấy danh sách booking operator:', error);
    message.error('Không thể tải danh sách booking operator');
    throw error;
  }
}

export const updateBookingStatus = async (bookingId, bookingStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/Booking/update-booking-status`, {
      bookingId: bookingId,
      bookingStatus: bookingStatus,
    }, {
      headers: getHeader(),
      method: 'PUT',
    });
    return response.data;
  } catch (error) {
    console.error(`update booking status error!`, error);
    message.error('Không thể cập nhật trạng thái booking');
    throw error;
  }
}
export const updatePaymentStatus = async (bookingId, paymentStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/Booking/update-payment-status`, {
      bookingId: bookingId,
      paymentStatus: paymentStatus,
    }, {
      headers: getHeader(),
      method: 'PUT',
    });
    return response.data;
  } catch (error) {
    console.error(`update payment status error!`, error);
    message.error('Không thể cập nhật trạng thái booking');
    throw error;
  }
}

export const updateContract = async (bookingId, contract) => {
  try {
    const response = await axios.put(`${BASE_URL}/ManageContract/UpdateContractForTourBooking`,
      {
        Contract: contract, // Dữ liệu hợp đồng
        BookingId: bookingId, // ID của booking
      }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT',
    });
    return response.data;
  } catch (error) {
    console.error(`update contract error!`, error);
    message.error('Không thể cập nhật hợp đồng');
    throw error;
  }
}

export const getBookingByDepartId = async (departureDateId) => {
  try {
    const response = await axios.get(`${BASE_URL}/DepartureDates/departure-date/${departureDateId}/bookings`,
      {
        headers: getHeader(),
      });
    return response.data;
  } catch (error) {
    console.error(`update contract error!`, error);
    message.error('Không thể cập nhật hợp đồng');
    throw error;
  }
}