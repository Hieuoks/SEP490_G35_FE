import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegisterHeader from './components/LogoHeader';
import RegisterForm from './components/RegisterForm';
import CopyrightFooter from './components/Footer';
import '../../assets/css/style.css';

const RegisterPage = () => (
  <div className="main-wrapper authentication-wrapper ">
    <div className="container-fluid">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
          <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
            <RegisterHeader />
            <div className="card authentication-card">
              <div className="card-header text-center">
                <h5 className="mb-1">Sign Up</h5>
                <p>Create your DreamsTour Account</p>
              </div>
              <div className="card-body">
                <RegisterForm />
              </div>
            </div>
            <CopyrightFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterPage;
