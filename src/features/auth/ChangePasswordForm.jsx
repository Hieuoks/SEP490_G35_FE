import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChangePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Lấy token từ URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || !confirm) {
      setError("Vui lòng nhập đầy đủ mật khẩu.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!token) {
      setError("Token không hợp lệ hoặc đã hết hạn.");
      return;
    }
    try {
      await resetPassword(token, password);
      setSuccess("Đổi mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="main-wrapper authentication-wrapper">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-11 mx-auto">
              <div className="p-4 text-center">
                <img src="assets/img/logo-dark.svg" alt="logo" className="img-fluid" />
              </div>
              <div className="card authentication-card">
                <div className="card-header">
                  <div className="text-center">
                    <h5 className="mb-1">Đổi mật khẩu</h5>
                    <p>Nhập thông tin để đổi mật khẩu</p>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Mật khẩu mới</label>
                      <div className="input-icon">
                        <span className="input-icon-addon">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={showPass ? "text" : "password"}
                          className="form-control form-control-lg pass-input"
                          placeholder="Nhập mật khẩu mới"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <span
                          className="input-icon-addon toggle-password"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPass(!showPass)}
                        >
                          <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Xác nhận mật khẩu</label>
                      <div className="input-icon">
                        <span className="input-icon-addon">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={showConfirm ? "text" : "password"}
                          className="form-control form-control-lg pass-input"
                          placeholder="Nhập lại mật khẩu"
                          value={confirm}
                          onChange={e => setConfirm(e.target.value)}
                        />
                        <span
                          className="input-icon-addon toggle-password"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          <FontAwesomeIcon icon={showConfirm ? faEye : faEyeSlash} />
                        </span>
                      </div>
                    </div>
                    {error && (
                      <div className="mb-3">
                        <div className="alert alert-danger py-2">{error}</div>
                      </div>
                    )}
                    {success && (
                      <div className="mb-3">
                        <div className="alert alert-success py-2">{success}</div>
                      </div>
                    )}
                    <div className="mb-0">
                      <button type="submit" className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100">
                        Đổi mật khẩu
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="coprright-footer">
          <p className="fs-14">
            Bản quyền &copy; 2025. Đã đăng ký bản quyền, <a href="javascript:void(0);" className="text-primary fw-medium">DreamsTour</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;