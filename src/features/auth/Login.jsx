import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/style.css";

import LogoHeader from "./components/LogoHeader";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";

// Hàm xóa tất cả cookies
function clearAllCookies() {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

const LoginPage = () => {
  useEffect(() => {
    // Xóa localStorage
    localStorage.clear();
    // Xóa sessionStorage
    sessionStorage.clear();
    // Xóa cookies
    clearAllCookies();
  }, []);

  return (
    <div className="main-wrapper authentication-wrapper ">
      <div className="container-fluid">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
              <LogoHeader />
              <LoginForm />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;