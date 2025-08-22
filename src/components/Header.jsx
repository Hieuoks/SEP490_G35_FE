import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMoon, faSun, faHeart, faUser, faBell, faBox } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { getNotification, marksAllRead, marksRead } from '../services/notificationService';
import { useNavigate } from "react-router-dom";
const HeaderTopbar = () => {
  const userId = Cookies.get('userId');
  const operatorId = Cookies.get('operatorId');
  const roleName = Cookies.get('roleName');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
const navigate = useNavigate();
  const fetchNotifications = () => {
    if (userId) {
      getNotification().then((res) => {
        setNotifications(res.notifications || []);
        setUnreadCount(res.unreadCount || 0);
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, [userId]);

  const handleMarkRead = async (id) => {
    await marksRead(id);
    fetchNotifications();
  };

  const handleMarkAllRead = async () => {
    await marksAllRead();
    fetchNotifications();
  };

  const handleLogout = () => {
    // Xóa tất cả cookies
    Object.keys(Cookies.get()).forEach(function(cookieName) {
        Cookies.remove(cookieName);
    });
    localStorage.clear();
    navigate('/login');
};

  // Chỉ lấy 5 thông báo gần nhất nếu chưa bấm "Xem tất cả"
  const notificationsToShow = showAllNotifications ? notifications : notifications.slice(0, 5);

  // Nếu là Admin thì không hiển thị notification và hồ sơ, chỉ để trống
  if (roleName === "Admin") {
    return (
      <div className="header-topbar header-top-six text-center bg-transparent">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center flex-wrap">
              <p className="d-flex align-items-center fs-14 mb-2 me-3">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                Tổng đài : +1 56565 56594
              </p>
              <p className="mb-2 d-flex align-items-center fs-14">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Email :
                <a href="mailto:support@example.com" className="ms-1">
                  support@example.com
                </a>
              </p>
            </div>
            <div className="navbar-logo mb-2">
              <a className="logo-dark header-logo" href="/home">
                <img src="assets/img/logo-dark.svg" className="logo" alt="Logo" />
              </a>
              <a className="logo-white header-logo" href="/home">
                <img src="assets/img/logo.svg" className="logo" alt="Logo" />
              </a>
            </div>
            <div style={{ minHeight: 48 }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header-topbar header-top-six text-center bg-transparent">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <p className="d-flex align-items-center fs-14 mb-2 me-3">
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              Tổng đài : +1 56565 56594
            </p>
            <p className="mb-2 d-flex align-items-center fs-14">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Email :
              <a href="mailto:support@example.com" className="ms-1">
                support@example.com
              </a>
            </p>
          </div>

          <div className="navbar-logo mb-2">
            <a className="logo-dark header-logo" href="/home">
              <img src="assets/img/logo-dark.svg" className="logo" alt="Logo" />
            </a>
            <a className="logo-white header-logo" href="/home">
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
                VNĐ
              </a>
              <ul className="dropdown-menu p-2 mt-2">
                <li><a className="dropdown-item rounded" href="#">VNĐ</a></li>
                <li><a className="dropdown-item rounded" href="#">USD</a></li>
                <li><a className="dropdown-item rounded" href="#">EURO</a></li>
              </ul>
            </div>

            <div className="me-3 mb-2">
              <a href="#" id="dark-mode-toggle" className="theme-toggle">
                <FontAwesomeIcon icon={faMoon} />
              </a>
              <a href="#" id="light-mode-toggle" className="theme-toggle ms-2">
                <FontAwesomeIcon icon={faSun} />
              </a>
            </div>

            <div className="fav-dropdown mb-2 me-3">
              <a href="/wishlist" className="position-relative">
                <FontAwesomeIcon icon={faHeart} />
                <span className="count-icon bg-secondary text-gray-9">0</span>
              </a>
            </div>

            {/* Nếu là operator thì hiển thị nút Gói */}
            {operatorId && (
              <div className="mb-2 me-3">
                <a
                  href="/package"
                  className="btn btn-outline-primary d-flex align-items-center"
                  style={{ minWidth: 80 }}
                >
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Gói
                </a>
              </div>
            )}

            <div className="d-flex align-items-center">
              <div className="dropdown mb-2 me-2">
                <a
                  href="#"
                  className="btn btn-outline-warning d-flex align-items-center justify-content-center position-relative"
                  onClick={() => {
                    setShowDropdown((prev) => !prev);
                    setShowAllNotifications(false);
                  }}
                  style={{ minWidth: 40 }}
                >
                  <FontAwesomeIcon icon={faBell} className="me-1" />
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 10 }}>
                      {unreadCount}
                    </span>
                  )}
                </a>
                {showDropdown && (
                  <div className="dropdown-menu show p-2 mt-2" style={{ minWidth: 300, right: 0, left: 'auto' }}>
                    <h6 className="dropdown-header">Thông báo</h6>
                    <button
                      className="btn btn-sm btn-outline-primary mb-2 w-100"
                      onClick={handleMarkAllRead}
                    >
                      Đánh dấu tất cả là đã đọc
                    </button>
                    {notificationsToShow.length === 0 ? (
                      <div className="text-center text-muted py-2">Không có thông báo nào</div>
                    ) : (
                      notificationsToShow.map((noti) => (
                        <div
                          key={noti.notificationId}
                          className={`dropdown-item rounded mb-2 ${noti.isRead ? 'text-muted' : 'bg-warning bg-opacity-25 fw-bold'}`}
                          style={noti.isRead ? {} : { borderLeft: '4px solid #ffc107', cursor: 'pointer' }}
                          onClick={() => !noti.isRead && handleMarkRead(noti.notificationId)}
                        >
                          <div>{noti.title}</div>
                          <div className="small text-muted">{new Date(noti.createdAt).toLocaleString()}</div>
                          <div>{noti.message}</div>
                        </div>
                      ))
                    )}
                    <div className="dropdown-divider"></div>
                   {!showAllNotifications && notifications.length > 5 && roleName === "Customer" && !operatorId && (
  <button
    className="dropdown-item text-center text-primary"
    onClick={() => {
      setShowDropdown(false);
      window.location.href = "/customer/notifications";
    }}
    style={{ cursor: 'pointer' }}
  >
    Xem tất cả
  </button>
)}
                  </div>
                )}
              </div>
              {userId ? (
                !operatorId ? (
                  <div className="dropdown mb-2 d-flex align-items-center">
  <a
    href="#"
    className="btn btn-success d-flex align-items-center justify-content-center dropdown-toggle me-2"
    onClick={e => {
      e.preventDefault();
      setShowProfileDropdown((prev) => !prev);
    }}
    style={{ minWidth: 120 }}
  >
    <FontAwesomeIcon icon={faUser} className="me-2" />
    Hồ sơ cá nhân
  </a>
  <a href="/chat-bot" className="btn btn-outline-info d-flex align-items-center">
    <i className="fas fa-robot me-2"></i>
    Chat Bot
  </a>
  {showProfileDropdown && (
    <div className="dropdown-menu show mt-2" style={{ minWidth: 180, right: 0, left: 'auto' }}>
      <a className="dropdown-item" href="/booking">Đặt lịch</a>
      <a className="dropdown-item" href="/customer/profile">Hồ sơ</a>
      <a className="dropdown-item" href="/customer/notifications">Thông báo</a>
      <a className="dropdown-item" href="/customer/setting">Cài đặt</a>
      <div className="dropdown-divider"></div>
      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
    </div>
  )}
</div>
                  
                ) : (
                  <a href="/profile" className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Hồ sơ cá nhân
                  </a>
                )
              ) : (
                <a
                  href="/login"
                  className="btn btn-dark w-100 mb-2 d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#login-modal"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopbar;