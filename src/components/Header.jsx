import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMoon, faSun, faHeart, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { getNotification, marksAllRead, marksRead } from '../services/notificationService';

const HeaderTopbar = () => {
  const userId = Cookies.get('userId');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

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

            <div className="d-flex align-items-center">
              <div className="dropdown mb-2 me-2">
                <a
                  href="#"
                  className="btn btn-outline-warning d-flex align-items-center justify-content-center position-relative"
                  onClick={() => setShowDropdown((prev) => !prev)}
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
                    {notifications.length === 0 ? (
                      <div className="text-center text-muted py-2">Không có thông báo nào</div>
                    ) : (
                      notifications.map((noti) => (
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
                    <a href="/notifications" className="dropdown-item text-center text-primary">Xem tất cả</a>
                  </div>
                )}
              </div>
              {userId ? (
                <a href="/profile" className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Hồ sơ cá nhân
                </a>
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