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
import BookingOperator from '../features/booking/BookingOperator';
import ListOpeTour from '../features/tour/ListOpeTour';
import MyPackage from '../features/package/MyPackage'; // Trang quản lý gói của nhà điều hành tour
import OperatorDashBoard from '../features/dashboard/OperatorDashBoard'; // Trang dashboard của nhà điều hành tour
import OpeScheduleTour from '../features/schedule/OpeScheduleTour';
import OpeSchedule from '../features/schedule/OpeSchedule';
import ListTourGuide from '../features/tourguide/ListTourGuide'; // Trang danh sách hướng dẫn viên du lịch
import CRUDDeparture from '../features/departuredate/CRUDDeparture';
import BookingDepart from '../features/booking/BookingDepart';
import PaymentPackage from '../pages/PaymentPackage';
import GuideNote from '../features/note/GuideNote';
import TourComparePage from '../pages/TourComparePage';
import CustomerProfile from '../pages/CustomerProfile';
import NotificationPage from '../pages/NotificationPage';
import ChangePasswordForm from '../features/auth/ChangePasswordForm';
import ChatBotPage from '../pages/ChatBotPage';
import VerificationPage from '../features/auth/VerificationPage';
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
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/profile" element={<ProflePage />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/setting" element={<CustomerProfile />} />
        <Route path="/setting/editProfile" element={<SettingProfile />} />
        <Route path="/admin/ListAccount" element={<ListAccount />} />
        <Route path="/package" element={<PackagePage />} />
        <Route path="/admin/packages" element={<ListPackages />} />
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/admin/dashboard" element={<MainLayout><AgentDashboard /></MainLayout>} />
        <Route path="/admin/feedback" element={<MainLayout><RecentFeedback /></MainLayout>} />
        <Route path="/admin/notifications" element={<MainLayout><NotificationPage /></MainLayout>} />
        <Route path="/customer/notifications" element={<MainLayout><NotificationPage /></MainLayout>} />
        <Route path="/tour-operator" element={<MainLayout><TourOperatorPage /></MainLayout>} />
        <Route path="/tour-operator/detail/:id" element={<MainLayout><TourOperatorDateilPage /></MainLayout>} />
        <Route path="/tour-operator/update/:id" element={<MainLayout><UpdateTourOpPage /></MainLayout>} />
        <Route path="/tour/update/:id" element={<MainLayout><UpdateTourPage /></MainLayout>} />
        <Route path="/tour-list" element={<MainLayout><TourListPage /></MainLayout>} />
        <Route path="/tour/detail/:id" element={<MainLayout><TourDetailPage /></MainLayout>} />
        <Route path="/tour/create" element={<MainLayout><CreateTourPage /></MainLayout>} />
        <Route path="/tour-operator/create" element={<MainLayout><CreateCompanyPage /></MainLayout>} />
        <Route path="/booking" element={<MainLayout><BookingConfirmation /></MainLayout>} />
        <Route path="/forgot-password" element={<><ForgotPasswordPage /></>} />
        <Route path="/tour/compare/:id" element={<MainLayout><TourComparePage /></MainLayout>} />
        <Route path="/chat-bot" element={<MainLayout><ChatBotPage /></MainLayout>} />
        <Route path="/operator/booking" element={<BookingOperator />} />
        <Route path="/operator/tours" element={<ListOpeTour />} />
        <Route path="/operator/schedules" element={<OpeSchedule />} />
        <Route path="/operator/package" element={<MyPackage />} />
        <Route path="/operator/dashboard" element={<OperatorDashBoard />} />
        <Route path="/operator/schedule/tour/:id" element={<OpeScheduleTour />} />
        <Route path="/guide/schedule" element={<OpeSchedule />} />
        <Route path="/operator/guides" element={<ListTourGuide />} />
        <Route path="/operator/tour/departdate/:tourId" element={<CRUDDeparture />} />
        <Route path="/departure/booking/:departureDateId" element={<BookingDepart />} />
        <Route path="/package/payment/:packageId" element={<PaymentPackage />} />
        <Route path="/Note" element={<GuideNote />} />
        <Route path="/Note/booking/:bookingId" element={<GuideNote />} />
        <Route path="/reset-password" element={<ChangePasswordForm />} />
        {/* Nếu cần thêm trang lỗi 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
