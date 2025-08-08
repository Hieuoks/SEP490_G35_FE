import React, { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";
                const Sidebar = () => {
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
                                                {/* <span className="fs-14 text-gray-6">Since 10 May 2025</span> */}
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
                                        <span className="fs-14 text-gray-3 fw-medium mb-2">Main</span>
                                    </li>
                                    <li>
                                        <a href="dashboard.html" className="d-flex align-items-center">
                                            <i className="isax isax-grid-55"></i> Dashboard
                                        </a>
                                    </li>
                                    <li className="submenu">
                                        <a href="javascript:void(0);" className="d-block">
                                            <i className="isax isax-calendar-tick5"></i>
                                            <span>My Bookings</span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <ul>
                                            <li>
                                                <a
                                                    href="customer-flight-booking.html"
                                                    className="fs-14 d-inline-flex align-items-center"
                                                >
                                                    Flights
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="customer-hotel-booking.html"
                                                    className="fs-14 d-inline-flex align-items-center"
                                                >
                                                    Hotels
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="customer-car-booking.html"
                                                    className="fs-14 d-inline-flex align-items-center"
                                                >
                                                    Cars
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="customer-cruise-booking.html"
                                                    className="fs-14 d-inline-flex align-items-center"
                                                >
                                                    Cruise
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="customer-tour-booking.html"
                                                    className="fs-14 d-inline-flex align-items-center"
                                                >
                                                    Tour
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="review.html" className="d-flex align-items-center">
                                            <i className="isax isax-magic-star5"></i> My Reviews
                                        </a>
                                    </li>
                                    <li>
                                        <div className="message-content">
                                            <a href="chat.html" className="d-flex align-items-center">
                                                <i className="isax isax-message-square5"></i> Messages
                                            </a>
                                            <span className="msg-count rounded-circle">02</span>
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <a href="wishlist.html" className="d-flex align-items-center">
                                            <i className="isax isax-heart5"></i> Wishlist
                                        </a>
                                    </li>
                                    <li>
                                        <span className="fs-14 text-gray-3 fw-medium mb-2">Finance</span>
                                    </li>
                                    <li>
                                        <a href="wallet.html" className="d-flex align-items-center">
                                            <i className="isax isax-wallet-add-15"></i> Wallet
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="payment.html" className="d-flex align-items-center">
                                            <i className="isax isax-money-recive5"></i> Payments
                                        </a>
                                    </li>
                                    <li>
                                        <span className="fs-14 text-gray-3 fw-medium mb-2">Account</span>
                                    </li>
                                    <li>
                                        <a
                                            href="/profile"
                                            className="d-flex align-items-center active"
                                        >
                                            <i className="isax isax-profile-tick5"></i> My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <div className="message-content">
                                            <a href="notification.html" className="d-flex align-items-center">
                                                <i className="isax isax-notification-bing5"></i> Notifications
                                            </a>
                                            <span className="msg-count bg-purple rounded-circle">05</span>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="/setting/editprofile" className="d-flex align-items-center">
                                            <i className="isax isax-setting-25"></i> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="index.html" className="d-flex align-items-center pb-0">
                                            <i className="isax isax-logout-15"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    );
                    
                };

                export default Sidebar;