import axios from 'axios';
import { message } from 'antd';
import { getHeader } from './api';
const BASE_URL = 'https://localhost:7012/api';
export const PurchasePackage = async (userId, packageId, amount, paymentMethod, numberYearActive) => {
    try {
        const response = await axios.post(`${BASE_URL}/PurchasedServicePackages/PurchaseServicePackages`, {
            userId: userId,
            packageId: packageId,
            amount: amount,
            paymentMethod: paymentMethod,
            numberYearActive: numberYearActive
        }, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi purchase package', error);
        message.error('Không thể mua package');
        throw error;
    }
}

export const getDetailPac = async (packageId) => {
    try {
        const response = await axios.get(`${BASE_URL}/ServicePackage/ViewDetailPackageServiceForCustomer/${packageId}`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi get package', error);
        message.error('Không thể get package');
        throw error;
    }
}
export const getPaymentHistoryByOpe = async (userId,pageNumber,pageSize) => {
    try {
        const response = await axios.get(`${BASE_URL}/Payment/ViewPaymentPackageHistory/${userId}`, {
            pageNumber:pageNumber,
            pageSize:pageSize,
        },{
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi get payment history', error);
        message.error('Không thể lấy lịch sử thanh toán');
        throw error;
    }
}