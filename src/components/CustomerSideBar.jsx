import React, { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";
import Cookies from 'js-cookie';
import { checkpackage } from "../services/packageService";
const userId = Cookies.get('userId');
const role = Cookies.get('roleName');
import { useNavigate } from "react-router-dom";

const CustomerSidebar = () => {
  const navigate = useNavigate();

  const [userResponse, setUserResponse] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getProfile();
        setUserResponse(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUserProfile();
  }, []);
  const [mypackage, setMyPackage] = useState([]);
  const getMyPackages = async () => {
    const data = await checkpackage(userId).then((res) => {
      setMyPackage(res);
    })
      .catch((error) => {
        setMyPackage([]);
        console.error("Lỗi khi kiểm tra gói:", error);
      });
  };
  useEffect(() => {
    getMyPackages();
  }, []);
  const handleLogout = () => {
    // Xóa tất cả cookies
    Object.keys(Cookies.get()).forEach(function(cookieName) {
        Cookies.remove(cookieName);
    });
    localStorage.clear();
    navigate('/login');
};
  return (
    <div className="theiaStickySidebar">
      <div className="card user-sidebar mb-4 mb-lg-0">
        <div className="card-header user-sidebar-header">
          <div className="profile-content rounded-pill">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={userResponse?.avatar}
                  alt="image"
                  className="img-fluid avatar avatar-lg rounded-circle flex-shrink-0 me-1"
                />
                <div>
                  <h6 className="fs-16">{userResponse?.userName}</h6>
                  <span className="fs-14 text-gray-6">{userResponse?.roleName}</span>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <a
                    href="profile-settings.html"
                    className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center"
                  >
                    <i className="isax isax-edit-2 fs-14"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body user-sidebar-body">
          <ul>
            <li>
              <span className="fs-14 text-gray-3 fw-medium mb-2">Tài khoản</span>
            </li>
            <li>
              <a
                href="/customer/profile"
                className="d-flex align-items-center"
              >
                <i className="isax isax-profile-tick5"></i> Hồ sơ cá nhân
              </a>
            </li>
            <li>
              <a href="/customer/setting" className="d-flex align-items-center">
                <i className="isax isax-setting-25"></i> Cài đặt
              </a>
            </li>
            <li>
              <a
                href="/booking"
                className="d-flex align-items-center"
              >
                <i className="isax isax-profile-tick5"></i> Đặt lịch
              </a>
            </li>
            <li>
              <a
                href="/customer/notifications"
                className="d-flex align-items-center"
              >
                <i className="isax isax-notification"></i> Thông báo
              </a>
            </li>
            
            <li>
              <button
                className="d-flex align-items-center pb-0 btn btn-link"
                style={{ color: "inherit", textDecoration: "none" }}
                onClick={handleLogout}
              >
                <i className="isax isax-logout-15"></i> Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerSidebar;