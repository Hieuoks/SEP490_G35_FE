import React, { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";
import Cookies from 'js-cookie';
import { checkpackage } from "../services/packageService";
const userId = Cookies.get('userId');
const role = Cookies.get('roleName');
const operatorId = Cookies.get('operatorId');
import { useNavigate } from "react-router-dom";

const OpeSidebar = () => {
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
        await checkpackage(userId)
            .then((res) => {
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
        Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName);
        });
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
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
                        {role === "Tour Operator" ? (
                            <div>
                                <li>
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Chính</span>
                                </li>
                                <li>
                                    <a href="/operator/dashboard" className="d-flex align-items-center">
                                        <i className="isax isax-grid-55"></i> Bảng điều khiển
                                    </a>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/operator/tours" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Tour
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/operator/schedules" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Lịch trình
                                        </a>
                                    </div>
                                </li>
                                <li className="submenu">
                                    <a href="/operator/booking" className="d-block">
                                        <i className="isax isax-calendar-tick5"></i>
                                        <span> Đặt tour</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/note" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Ghi chú
                                        </a>
                                    </div>
                                </li>
                                {mypackage.length !== 0 && mypackage.tourGuideFunction ? (
                                    <li className="mb-2">
                                        <a href="/operator/guides" className="d-flex align-items-center">
                                            <i className="isax isax-heart5"></i> Hướng dẫn viên
                                        </a>
                                    </li>
                                ) : (
                                    <li></li>
                                )}
                                <li>
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Tài chính</span>
                                </li>
                                <li>
                                    <a href="/operator/package" className="d-flex align-items-center">
                                        <i className="isax isax-magic-star5"></i> Giao dịch
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div>
                                <li>
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Chính</span>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/guide/schedule" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Lịch trình
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/note" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Ghi chú
                                        </a>
                                    </div>
                                </li>
                                <li></li>
                            </div>
                        )}

                        <li>
                            <span className="fs-14 text-gray-3 fw-medium mb-2">Tài khoản</span>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="d-flex align-items-center"
                            >
                                <i className="isax isax-profile-tick5"></i> Hồ sơ của tôi
                            </a>
                        </li>
                        <li>
                            <a href="/setting/editprofile" className="d-flex align-items-center">
                                <i className="isax isax-setting-25"></i> Cài đặt
                            </a>
                        </li>
                        {/* Thêm link sang trang chi tiết nhà điều hành */}
                        {role === "Tour Operator" && operatorId && (
                            <li>
                                <a
                                    href={`/tour-operator/detail/${operatorId}`}
                                    className="d-flex align-items-center"
                                >
                                    <i className="isax isax-document-text"></i> Thông tin nhà điều hành
                                </a>
                            </li>
                        )}
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

export default OpeSidebar;