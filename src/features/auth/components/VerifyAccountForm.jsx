import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faCheckCircle, faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { verifyAccount, resendVerification, login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const VerifyAccountForm = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerified(false);
    try {
      await verifyAccount(token);
      setVerified(true);

      // Lấy roleName, email, password từ localStorage
      const roleName = localStorage.getItem("roleName");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (roleName === "Tour Operator") {
        try {
          const loginRes = await login(email, password);
          Cookies.set("token", loginRes.token);
          Cookies.set("userId", loginRes.userId);
          localStorage.setItem("userId", loginRes.userId);
          Cookies.set("email", loginRes.email);
          Cookies.set("roleName", loginRes.roleName);
          localStorage.setItem("token", loginRes.token);
          // Xóa password khỏi localStorage
          localStorage.removeItem("password");
          window.location.href = "/tour-operator/create";
        } catch (err) {
          setError("Đăng nhập tự động thất bại. Vui lòng đăng nhập lại.");
          localStorage.removeItem("password");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        // Xóa password khỏi localStorage
        localStorage.removeItem("password");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError("Mã xác thực không đúng hoặc đã hết hạn. Vui lòng kiểm tra lại.");
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setResendMsg("");
    setError("");
    try {
      const email = localStorage.getItem("email") || "";
      await resendVerification(email);
      setResendMsg("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư.");
    } catch (err) {
      setError("Không thể gửi lại email xác thực. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="card authentication-card">
      <div className="card-header text-center">
        <h5 className="mb-1">Xác thực tài khoản</h5>
        <p>Nhập mã xác thực đã nhận để kích hoạt tài khoản của bạn</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Mã xác thực</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nhập mã xác thực"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
          </div>
          {verified && (
            <div className="mb-4">
              <p className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                Xác thực tài khoản thành công!
              </p>
            </div>
          )}
          {error && (
            <div className="mb-4">
              <p className="text-danger">{error}</p>
            </div>
          )}
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
              disabled={!token}
            >
              Xác thực
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <button
              className="btn btn-link p-0 fs-14"
              style={{ textDecoration: "underline" }}
              onClick={handleResend}
            >
              <FontAwesomeIcon icon={faEnvelope} className="me-1" />
              Gửi lại email xác thực
            </button>
          </div>
          {resendMsg && (
            <div className="mb-2">
              <p className="text-success">{resendMsg}</p>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <p className="fs-14">
              Đã có tài khoản?{" "}
              <a href="/login" className="link-primary fw-medium">Đăng nhập</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccountForm;