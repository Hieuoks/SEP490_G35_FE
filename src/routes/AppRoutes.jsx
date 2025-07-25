import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import LoginPage from '../features/auth/Login'
import RegisterPage from '../features/auth/SignUp';
import HomePage from '../pages/HomePage'; // Bạn có thể tạo file HomePage.jsx sau
import ForgotPasswordPage from '../features/auth/ForgotPassword';
import TourOperatorPage from '../pages/TourOperatorPage'; // Trang dành cho nhà điều hành tour
import TourDetailPage from '../pages/TourDetailPage';
import TourOperatorDateilPage from '../pages/TourOperatorDetail'
import TourListPage from '../pages/TourPage'; // Trang danh sách tour, nếu cần
import CreateTourPage from '../pages/CreateTourPage';
import CreateCompanyPage from '../pages/CreateTourOpPage';
import UpdateTourOpPage from '../pages/UpdateTourOpPage';
import UpdateTourPage from '../pages/UpdateTourPage'; // Trang cập nhật tour, nếu cần
import BookingConfirmation from '../pages/Booking';
const MainLayout = ({ children }) => {
  return (
    <>
      <HeaderTopbar />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/tour-operator" element={<MainLayout><TourOperatorPage /></MainLayout>} />
        <Route path="/tour-operator/detail/:id" element={<MainLayout><TourOperatorDateilPage /></MainLayout>} />
        <Route path="/tour-operator/update/:id" element={<MainLayout><UpdateTourOpPage /></MainLayout>} />
        <Route path="/tour/update/:id" element={<MainLayout><UpdateTourPage /></MainLayout>} />
        <Route path="/tour-list" element={<MainLayout><TourListPage /></MainLayout>} />
        <Route path="/tour/detail/:id" element={<MainLayout><TourDetailPage /></MainLayout>} />
        <Route path="/tour/create" element={<MainLayout><CreateTourPage /></MainLayout>} />
        <Route path="/tour-operator/create" element={<MainLayout><CreateCompanyPage /></MainLayout>} />
        <Route path="/booking" element={<MainLayout><BookingConfirmation /></MainLayout>} />
        <Route path="/forgot-password" element={<MainLayout><ForgotPasswordPage /></MainLayout>} />
        {/* Nếu cần thêm trang lỗi 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
