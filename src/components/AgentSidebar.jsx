import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faList,
  faMoneyBillWave,
  faCommentDots,
  faBoxOpen,
  faUsers,
  faArrowLeft,
  faBell,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { getProfile } from "../services/profileService";
import Cookies from "js-cookie";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const AgentSidebar = () => {
  const [userResponse, setUserResponse] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getProfile();
        setUserResponse(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('userId');
    Cookies.remove('roleName');
    Cookies.remove('operatorId');
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="col-xl-3 col-lg-4 theiaStickySidebar">
      <div className="card shadow-sm border-0 mb-4 mb-lg-0">
        <div className="card-header bg-light text-center">
          <div className="d-flex flex-column align-items-center py-3">
            <img
              src={userResponse?.avatar || "https://ui-avatars.com/api/?name=" + userResponse?.userName}
              alt="Ảnh đại diện"
              className="rounded-circle mb-2"
              style={{
                width: 72,
                height: 72,
                objectFit: "cover",
                border: "2px solid #0d6efd",
              }}
            />
            <h6 className="fs-16 mb-1 mt-2">{userResponse?.userName || "Admin"}</h6>
            <p className="fs-14 mb-2 text-muted">
              {userResponse?.roleName || "Admin"}
            </p>
          </div>
        </div>
        <div className="card-body px-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <a
                href="/admin/dashboard"
                className="btn btn-outline-secondary w-100 text-start d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Quay lại Dashboard
              </a>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-light w-100 text-start d-flex align-items-center"
                onClick={() => scrollToSection("dashboard-stats")}
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2 text-primary" />
                Thống kê
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-light w-100 text-start d-flex align-items-center"
                onClick={() => scrollToSection("recently-added")}
              >
                <FontAwesomeIcon icon={faList} className="me-2 text-success" />
                Người dùng mới
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-light w-100 text-start d-flex align-items-center"
                onClick={() => scrollToSection("latest-invoices")}
              >
                <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-info" />
                Hóa đơn mới
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-light w-100 text-start d-flex align-items-center"
                onClick={() => scrollToSection("recent-hotel-bookings")}
              >
                <FontAwesomeIcon icon={faList} className="me-2 text-warning" />
                Đơn đặt tour
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-light w-100 text-start d-flex align-items-center"
                onClick={() => scrollToSection("recent-tour-bookings")}
              >
                <FontAwesomeIcon icon={faList} className="me-2 text-secondary" />
                Tour gần đây
              </button>
            </li>
            <li className="mb-2">
              <a
                href="/admin/packages"
                className="btn btn-light w-100 text-start d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faBoxOpen} className="me-2 text-primary" />
                Quản lý gói
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/admin/ListAccount"
                className="btn btn-light w-100 text-start d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faUsers} className="me-2 text-success" />
                Quản lý tài khoản
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/admin/notifications"
                className="btn btn-light w-100 text-start d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faBell} className="me-2 text-warning" />
                Thông báo
              </a>
            </li>
            <li>
              <a
                href="/admin/feedback"
                className="btn btn-outline-primary w-100 text-start d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faCommentDots} className="me-2" />
                Feedback
              </a>
            </li>
            <li className="mt-2">
              <button
                className="btn btn-outline-danger w-100 text-start d-flex align-items-center"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;