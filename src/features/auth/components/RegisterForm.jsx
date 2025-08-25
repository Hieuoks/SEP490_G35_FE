import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faLock, faEyeSlash, faArrowRight, faPhone, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import logoGG from '../../../assets/img/icons/google-icon.svg';
import logoFB from '../../../assets/img/icons/fb-icon.svg';
import { register, login } from '../../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { uploadToCloudinary } from '../../../services/imgUploadService';
import SocialLoginButtons from "./SocialLoginButtons";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    avatar: '',
    roleName: 'Customer'
  });
  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    // Password: min 8 ký tự, ít nhất 1 chữ cái, 1 số, 1 chữ in hoa
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải đủ 10 số';
    }

    if (!formData.userName) {
      newErrors.userName = 'Tên người dùng không được để trống';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải tối thiểu 8 ký tự, gồm chữ cái, số và ít nhất 1 ký tự in hoa';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        setFormData(prev => ({
          ...prev,
          avatar: url
        }));
        toast.success('Tải ảnh đại diện thành công!');
      } catch (error) {
        toast.error('Tải ảnh đại diện thất bại!');
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await register(
          formData.userName,
          formData.email,
          formData.password,
          formData.address,
          formData.phoneNumber,
          formData.avatar,
          formData.roleName
        );
        toast.success('Đăng ký thành công!');

        // Lưu email vào localStorage và chuyển sang trang verify
        localStorage.setItem('email', formData.email);
        localStorage.setItem('roleName', formData.roleName);
        localStorage.setItem('password', formData.password);
        navigate('/verify');
      } catch (error) {
        toast.error('Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Tên người dùng</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faUser} /></span>
          <input
            type="text"
            name="userName"
            className="form-control form-control-lg"
            placeholder="Nhập họ tên"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        {errors.userName && <div className="text-danger fs-14 mt-1">{errors.userName}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faEnvelope} /></span>
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <div className="text-danger fs-14 mt-1">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faPhone} /></span>
          <input
            type="text"
            name="phoneNumber"
            className="form-control form-control-lg"
            placeholder="Nhập số điện thoại 10 số"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && <div className="text-danger fs-14 mt-1">{errors.phoneNumber}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          <input
            type="text"
            name="address"
            className="form-control form-control-lg"
            placeholder="Nhập địa chỉ"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Ảnh đại diện</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faUser} /></span>
          <input
            type="file"
            name="avatar"
            className="form-control form-control-lg"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploading}
          />
        </div>
        {uploading && <div className="text-info fs-14 mt-1">Đang tải ảnh...</div>}
        {formData.avatar && (
          <div className="mt-2">
            <img src={formData.avatar} alt="Avatar Preview" style={{ width: 60, height: 60, borderRadius: '50%' }} />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Vai trò</label>
        <select
          className="form-select form-control-lg"
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
        >
          <option value="Customer">Khách hàng</option>
          <option value="Tour Operator">Nhà điều hành tour</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Mật khẩu</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faLock} /></span>
          <input
            type="password"
            name="password"
            className="form-control form-control-lg pass-input"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="input-icon-addon toggle-password"><FontAwesomeIcon icon={faEyeSlash} /></span>
        </div>
        {errors.password && <div className="text-danger fs-14 mt-1">{errors.password}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Nhập lại mật khẩu</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faLock} /></span>
          <input
            type="password"
            name="confirmPassword"
            className="form-control form-control-lg pass-input"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="input-icon-addon toggle-password"><FontAwesomeIcon icon={faEyeSlash} /></span>
        </div>
        {errors.confirmPassword && <div className="text-danger fs-14 mt-1">{errors.confirmPassword}</div>}
      </div>

      <div className="mt-3 mb-3">
        <div className="form-check d-flex align-items-center">
          <input className="form-check-input mt-0" type="checkbox" id="agree" />
          <label className="form-check-label ms-2 text-gray-9 fs-14" htmlFor="agree">
            Tôi đồng ý với <a href="/terms-conditions" className="link-primary fw-medium">Điều khoản dịch vụ.</a>
          </label>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100" disabled={uploading}>
          Đăng ký <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </button>
      </div>

      <div className="login-or mb-3"><span className="span-or">Hoặc</span></div>

      <SocialLoginButtons />

      <div className="d-flex justify-content-center">
        <p className="fs-14">Đã có tài khoản? <a href="/login" className="link-primary fw-medium">Đăng nhập</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;