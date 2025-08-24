import logo from "../assets/img/logo.svg";
import Cookies from 'js-cookie';
import { getNotification, marksAllRead, marksRead } from '../services/notificationService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa6";

const userId = Cookies.get('userId');
const operatorId = Cookies.get('operatorId');
const roleName = Cookies.get('roleName');
const HeaderTest = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
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
  const [userResponse, setUserResponse] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getProfile();
        setUserResponse(data);
        console.log("user", data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUserProfile();
  }, []);
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
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      Cookies.remove(cookieName);
    });
    localStorage.clear();
    navigate('/login');
  };

  const notificationsToShow = showAllNotifications ? notifications : notifications.slice(0, 5);

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

    <div class="main-header">
      <header>
        <div class="container">

          <div class="header-nav">
            <div class="main-menu-wrapper">
              <div class="navbar-logo">
                <a class="logo-white header-logo" href="/home">
                  <img src={logo} class="logo" alt="Logo" />
                </a>
              </div>
              <nav id="mobile-menu">
                <ul class="main-nav">
                  <li class="has-submenu megamenu">
                    <a href="/home">Trang chủ</a>
                  </li>

                  <li class="has-submenu megamenu">
                    <a href="/tour-list">Tour</a>
                  </li>
                  <li class="has-submenu megamenu">
                    <a href="/tour-operator">Nhà Điều Hành</a>
                  </li>
                  <li class="has-submenu megamenu">
                    <a href="/tour-operator">Chính sách</a>
                  </li>
                  <li class="has-submenu megamenu">
                    <a href="/chat-bot">Chat Bot</a>
                  </li>
                  {operatorId && (
                    <li class="has-submenu megamenu">
                      <a href="/package">Gói</a>
                    </li>
                  )}

                </ul>
              </nav>

              <div class="header-btn d-flex align-items-center">
                {userId && (
                  <div class="me-3">
                    <a href="#"
                      className="btn btn-outline-warning d-flex align-items-center justify-content-center position-relative"
                      onClick={() => {
                        setShowDropdown((prev) => !prev);
                        setShowAllNotifications(false);
                      }}
                      style={{ minWidth: 40 }}
                    >
                      <FaBell color="white" />
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
                )}

                {userId ? (
                  roleName === "Tour Operator" ? (
                    <div class="dropdown profile-dropdown">
                      <a href="javascript:void(0);" class="d-flex align-items-center" data-bs-toggle="dropdown">
                        <span class="avatar avatar-md">
                          <img src={userResponse?.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} alt="Img" class="img-fluid rounded-circle border border-white border-4" />
                        </span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="/operator/dashboard">Dashboard</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="/operator/tours">Tour</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="/operator/booking">Đơn booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="/operator/schedules">Schedule</a>
                        </li>
                        <li>
                          <hr class="dropdown-divider my-2" />
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="/profile">Hồ sơ</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" onClick={handleLogout}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  ) : roleName === "Customer" ? (
                    <div class="dropdown profile-dropdown">
                      <a href="javascript:void(0);" class="d-flex align-items-center" data-bs-toggle="dropdown">
                        <span class="avatar avatar-md">
                          <img src={userResponse?.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} alt="Img" class="img-fluid rounded-circle border border-white border-4" />
                        </span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="dashboard.html">Dashboard</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="customer-hotel-booking.html">My Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="my-profile.html">My Profile</a>
                        </li>
                        <li>
                          <hr class="dropdown-divider my-2" />
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="profile-settings.html">Settings</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" onClick={handleLogout}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div class="dropdown profile-dropdown">
                      <a href="javascript:void(0);" class="d-flex align-items-center" data-bs-toggle="dropdown">
                        <span class="avatar avatar-md">
                          <img src={userResponse?.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} alt="Img" class="img-fluid rounded-circle border border-white border-4" />
                        </span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="customer-hotel-booking.html">My Schedule</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="my-profile.html">My Profile</a>
                        </li>
                        <li>
                          <hr class="dropdown-divider my-2" />
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" href="profile-settings.html">Settings</a>
                        </li>
                        <li>
                          <a class="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2" onClick={handleLogout}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  )
                ) : (
                  <a href="/login" class="btn btn-primary me-0">Đăng nhập</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
export default HeaderTest;