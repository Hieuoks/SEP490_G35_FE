// src/pages/ForgotPasswordPage.jsx
import React from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Logo from './components/LogoHeader';
import Footer from "./components/Footer";

const ForgotPasswordPage = () => {
  return (
    <div className="main-wrapper authentication-wrapper">
      <div className="container-fluid vh-100">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
            <div className="p-4 text-center">
              <Logo />
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
