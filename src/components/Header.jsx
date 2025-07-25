
import React from 'react';

const HeaderTopbar = () => {
  return (
    <div className="header-topbar header-top-six text-center bg-transparent">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <p className="d-flex align-items-center fs-14 mb-2 me-3">
              <i className="isax isax-call5 me-2"></i>Toll Free : +1 56565 56594
            </p>
            <p className="mb-2 d-flex align-items-center fs-14">
              <i className="isax isax-message-text-15 me-2"></i>Email :
              <a href="mailto:support@example.com" className="ms-1">
                support@example.com
              </a>
            </p>
          </div>

          <div className="navbar-logo mb-2">
            <a className="logo-dark header-logo" href="index.html">
              <img src="assets/img/logo-dark.svg" className="logo" alt="Logo" />
            </a>
            <a className="logo-white header-logo" href="index.html">
              <img src="assets/img/logo.svg" className="logo" alt="Logo" />
            </a>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown mb-2 me-3">
              <a
                href="#"
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                USD
              </a>
              <ul className="dropdown-menu p-2 mt-2">

                <li><a className="dropdown-item rounded" href="#">USD</a></li>
                <li><a className="dropdown-item rounded" href="#">YEN</a></li>
                <li><a className="dropdown-item rounded" href="#">EURO</a></li>
              </ul>
            </div>

            <div className="me-3 mb-2">
              <a href="#" id="dark-mode-toggle" className="theme-toggle">
                <i className="isax isax-moon"></i>
              </a>
              <a href="#" id="light-mode-toggle" className="theme-toggle">
                <i className="isax isax-sun-1"></i>
              </a>
            </div>

            <div className="fav-dropdown mb-2 me-3">
              <a href="wishlist.html" className="position-relative">
                <i className="isax isax-heart"></i>
                <span className="count-icon bg-secondary text-gray-9">0</span>
              </a>
            </div>

            <div>
              <a
                href="#"
                className="text-white btn btn-dark w-100 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#login-modal"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopbar;


