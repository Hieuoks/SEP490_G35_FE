import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';

const BASE_URL = 'http://localhost:5298/api';
export const getSchedule = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/DepartureDates/operator`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách lịch trình:', error);
    message.error('Không thể tải danh sách lịch trình');
    throw error;
  }
}

export const getScheduleByTourGuide = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/DepartureDates/guide`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy lịch trình theo hướng dẫn viên:', error);
    message.error('Không thể tải lịch trình của hướng dẫn viên');
    throw error;
  }
}
export const getDepartDateByTourId = async (tourId) => {
  try {
    const response = await axios.get(`${BASE_URL}/DepartureDates/tour/${tourId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy lịch trình theo tour ID:', error);
    message.error('Không thể tải lịch trình của tour');
    throw error;
  }
}

export const addDepartureDate = async (tourId, startDate) => {
  try {
    // Sử dụng ISO string như API yêu cầu
    const requestData = {
      tourId: parseInt(tourId),
      startDate: startDate
    };
    console.log('Request data:', requestData);

    const response = await axios.post(`${BASE_URL}/DepartureDates`, requestData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo ngày khởi hành:', error.response?.data);
    message.error('Không thể add tourguide vào ngày khởi hành');
    throw error;
  }
}
export const addTourGuideForDepartdate = async (tourId, departureDateId, tourGuides) => {
  try {
    const requestData = {
      tourId: parseInt(tourId),
      departureDateId: departureDateId,
      tourGuides: tourGuides
    };
    console.log("request data:", requestData);
    const response = await axios.post(`${BASE_URL}/TourGuideAssignment/multiple`, {
      tourId: parseInt(tourId),
      departureDateId: departureDateId,
      tourGuides: tourGuides
    }, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error('Lỗi add tourguide vào ngày khởi hành', error);
    message.error('Không thể add tourguide vào ngày khởi hành');
    throw error;
  }
}

export const deleteDepartDate = async (departureDateId) => {
  try {

    console.log("request data:", departureDateId);
    const response = await axios.delete(`${BASE_URL}/TourDepartureDate/SoftDeleteDepartureDate/${departureDateId}`, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error('Lỗi delete depart', error);
    message.error('Không thể delete depart');
    throw error;
  }
}

export const cancelSchedule = async (departureDateId) => {
  try {

    console.log("request data:", departureDateId);
    const response = await axios.put(`${BASE_URL}/DepartureDates/${departureDateId}/cancel`, {}, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error('Lỗi cancel schedule', error);
    message.error('Không thể cancel schedule');
    throw error;
  }
}
export const getDepartById = async (departureDateId) => {
  try {
    const response = await axios.get(`${BASE_URL}/DepartureDates/${departureDateId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy lịch trình theo ID:', error);
    message.error('Không thể tải lịch trình theo ID');
    throw error;
  }
}

export const updateDepartDate = async (departureDateId, startDate) => {
  try {
    const requestData = {
      departureDateId: departureDateId,
      startDate: startDate
    };
    console.log('Request data:', requestData);

    const response = await axios.put(`${BASE_URL}/DepartureDates/${departureDateId}`, requestData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi cập nhật ngày khởi hành:', error.response?.data);
    message.error('Không thể cập nhật ngày khởi hành');
    throw error;
  }
}

export const deleteTourGuideFromDepartdate = async (asignId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/TourGuideAssignment/${asignId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi xóa hướng dẫn viên khỏi ngày khởi hành:', error);
    message.error('Không thể xóa hướng dẫn viên khỏi ngày khởi hành');
    throw error;
  }
}




