import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../features/auth/Login'
import RegisterPage from '../features/auth/SignUp';
import HomePage from '../pages/HomePage'; // Bạn có thể tạo file HomePage.jsx sau
import ForgotPasswordPage from '../features/auth/ForgotPassword';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Nếu cần thêm trang lỗi 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
