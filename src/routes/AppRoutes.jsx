import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../features/auth/Login'
import RegisterPage from '../features/auth/SignUp';
import HomePage from '../pages/HomePage'; 
import ForgotPasswordPage from '../features/auth/ForgotPassword';
import ProflePage from '../features/profile/ProfilePage'; 
import SettingProfile from '../features/setting/SettingProfile'; 
import ListAccount from '../features/account/ListAccount'; 
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<ProflePage />} />
        <Route path="/setting/editProfile" element={<SettingProfile />} />
        <Route path="/admin/ListAccount" element={<ListAccount /> } />
        
        {/* Nếu cần thêm trang lỗi 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
