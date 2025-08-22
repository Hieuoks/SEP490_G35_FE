import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { forgotPassword } from "../../../services/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError("Không thể gửi yêu cầu. Vui lòng kiểm tra lại email.");
    }
  };

  return (
    <div className="card authentication-card">
      <div className="card-header text-center">
        <h5 className="mb-1">Quên mật khẩu</h5>
        <p>Đặt lại mật khẩu DreamsTour của bạn</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {sent && (
            <div className="mb-4">
              <p className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                Đã gửi yêu cầu đặt lại mật khẩu tới “{email}”
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
              disabled={!email}
            >
              Đặt lại mật khẩu
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <p className="fs-14">
              Đã nhớ mật khẩu?{" "}
              <a href="/login" className="link-primary fw-medium">Đăng nhập</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;