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
    
if (roleName === "Customer") {
  navigate('/home');
} else if (roleName === "Admin") {
  navigate('/admin/dashboard');
} else if (operatorData && operatorData.tourOperatorId) {
  navigate('/operator/dashboard');
} else {
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
        <h5 className="mb-1">Sign In</h5>
        <p>Sign in to Start Manage your DreamsTour Account</p>
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
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter Password"
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
                Remember Me
              </label>
            </div>
            <a href="/forgot-password" className="link-primary fw-medium">
              Forgot Password?
            </a>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-xl btn-primary w-100">
              Login <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="login-or mb-3 text-center">
            <span className="span-or">Or</span>
          </div>
          <SocialLoginButtons />
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="link-primary fw-medium">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;