import React, { useState } from "react";
import Cookies from "js-cookie";
import SocialLoginButtons from "./SocialLoginButtons";
import { login,getOperatorID } from "../../../services/authService";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.warn("Invalid email format.");
      return;
    }

    try {
      const result = await login(email, password);
      const { token, userId, roleName } = result;

      if (rememberMe) {
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("email", email, { expires: 7 });
        Cookies.set("userId", userId, { expires: 7 });
        Cookies.set("roleName", roleName, { expires: 7 });
      } else {
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("email", email, { expires: 1 });
        Cookies.set("userId", userId, { expires: 1 });
        Cookies.set("roleName", roleName, { expires: 1 });
      }

      localStorage.setItem("token", token);
const operatorData = await getOperatorID();
if (operatorData && operatorData.tourOperatorId) {
  Cookies.set("operatorId", operatorData.tourOperatorId, { expires: 7 });
}

      toast.success("Login successful!");
        if (roleName === "Tour Operator") {
        if (operatorData && operatorData.tourOperatorId) {
          navigate('/operator/dashboard');
        } else {
          // Nếu chưa có operatorId thì chuyển về trang tạo nhà điều hành
          navigate('/tour-operator/create');
        }
      } else if (roleName === "Admin") {
  navigate('/admin/dashboard');
} else if (roleName === "Customer") {
  navigate('/home');
} else if (roleName === "Tour Guide"){
  navigate('/guide/schedule');
}else{
  navigate('/home');
}
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="card authentication-card">
      <div className="card-header text-center">
        <h5 className="mb-1">Đăng nhập</h5>
        <p>Đăng nhập để quản lý tài khoản DreamsTour của bạn</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Nhập email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon-addon toggle-password">
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div>
          <div className="mt-3 mb-3 d-flex justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember_me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remember_me">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="/forgot-password" className="link-primary fw-medium">
              Quên mật khẩu?
            </a>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-xl btn-primary w-100">
              Đăng nhập <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="login-or mb-3 text-center">
            <span className="span-or">Hoặc</span>
          </div>
          <SocialLoginButtons />
          <div className="text-center">
            <p>
              Chưa có tài khoản?{" "}
              <a href="/register" className="link-primary fw-medium">
                Đăng ký
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
);
};

export default LoginForm;