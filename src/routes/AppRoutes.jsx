import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import LoginPage from '../features/auth/Login'
import RegisterPage from '../features/auth/SignUp';
import HomePage from '../pages/HomePage'; 
import ForgotPasswordPage from '../features/auth/ForgotPassword';
import ProflePage from '../features/profile/ProfilePage'; 
import SettingProfile from '../features/setting/SettingProfile'; 
import ListAccount from '../features/account/ListAccount'; 
import PackagePage from '../pages/PackagePage';
import ListPackages from '../features/package/ListPackages';
import TourOperatorPage from '../pages/TourOperatorPage'; // Trang dành cho nhà điều hành tour
import TourDetailPage from '../pages/TourDetailPage';
import TourOperatorDateilPage from '../pages/TourOperatorDetail'
import TourListPage from '../pages/TourPage'; // Trang danh sách tour, nếu cần
import CreateTourPage from '../pages/CreateTourPage';
import CreateCompanyPage from '../pages/CreateTourOpPage';
import UpdateTourOpPage from '../pages/UpdateTourOpPage';
import UpdateTourPage from '../pages/UpdateTourPage'; // Trang cập nhật tour, nếu cần
import BookingConfirmation from '../pages/Booking';
import AgentDashboard from '../pages/AgentDashboard';
import RecentFeedback from '../components/RecentFeedback';
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
        <Route path="/profile" element={<ProflePage />} />
        <Route path="/setting/editProfile" element={<SettingProfile />} />
        <Route path="/admin/ListAccount" element={<ListAccount /> } />
        <Route path="/package" element={<PackagePage /> } />
        <Route path="/admin/packages" element={<ListPackages />} />
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/admin/dashboard" element={<MainLayout><AgentDashboard /></MainLayout>} />
        <Route path="/admin/feedback" element={<MainLayout><RecentFeedback /></MainLayout>} />
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
