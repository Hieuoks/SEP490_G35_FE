import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faLock, faEyeSlash, faArrowRight, faPhone, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import logoGG from '../../../assets/img/icons/google-icon.svg';
import logoFB from '../../../assets/img/icons/fb-icon.svg';
import { register } from '../../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', address: '', phone: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      register(formData.name, formData.email, formData.password, formData.address, formData.phone)
        .then(response => {console.log('Registration successful:', response);
          toast.success('Registration successful! Please log in.');
          setFormData({ name: '', email: '', password: '', confirmPassword: '', address: '', phone: '' });
          setErrors({});
        })
        .catch(error => {console.error('Registration failed:', error);
          toast.error('Registration failed. Please try again.');
          
        });
      console.log('Form is valid:', formData);
      navigate('/login'); // Redirect to login page after successful registration
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">User Name</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faUser} /></span>
          <input type="text" name="name" className="form-control form-control-lg" placeholder="Enter Full Name" value={formData.name} onChange={handleChange} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faEnvelope} /></span>
          <input type="email" name="email" className="form-control form-control-lg" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
        </div>
        {errors.email && <div className="text-danger fs-14 mt-1">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faPhone} /></span>
          <input type="text" name="phone" className="form-control form-control-lg" placeholder="Enter 10-digit Phone Number" value={formData.phone} onChange={handleChange} />
        </div>
        {errors.phone && <div className="text-danger fs-14 mt-1">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          <input type="text" name="address" className="form-control form-control-lg" placeholder="Enter Address" value={formData.address} onChange={handleChange} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" name="password" className="form-control form-control-lg pass-input" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
          <span className="input-icon-addon toggle-password"><FontAwesomeIcon icon={faEyeSlash} /></span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <div className="input-icon">
          <span className="input-icon-addon"><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" name="confirmPassword" className="form-control form-control-lg pass-input" placeholder="Re-enter Password" value={formData.confirmPassword} onChange={handleChange} />
          <span className="input-icon-addon toggle-password"><FontAwesomeIcon icon={faEyeSlash} /></span>
        </div>
        {errors.confirmPassword && <div className="text-danger fs-14 mt-1">{errors.confirmPassword}</div>}
      </div>

      <div className="mt-3 mb-3">
        <div className="form-check d-flex align-items-center">
          <input className="form-check-input mt-0" type="checkbox" id="agree" />
          <label className="form-check-label ms-2 text-gray-9 fs-14" htmlFor="agree">
            I agree with the <a href="/terms-conditions" className="link-primary fw-medium">Terms Of Service.</a>
          </label>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100">
          Register <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </button>
      </div>

      <div className="login-or mb-3"><span className="span-or">Or</span></div>

      <div className="d-flex align-items-center mb-3">
        <a href="#" className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-2">
          <img src={logoGG} className="me-2" alt="Google" /> Google
        </a>
        <a href="#" className="btn btn-light flex-fill d-flex align-items-center justify-content-center">
          <img src={logoFB} className="me-2" alt="Facebook" /> Facebook
        </a>
      </div>

      <div className="d-flex justify-content-center">
        <p className="fs-14">Already have an account? <a href="/login" className="link-primary fw-medium">Sign In</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;
