import React, { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";
import Cookies from 'js-cookie';
import { checkpackage } from "../services/packageService";
const userId = Cookies.get('userId');
const role = Cookies.get('roleName');
const OpeSidebar = () => {


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
    const [mypackage,setMyPackage] = useState([]);
    const getMyPackages = async () => {
    
                const data = await checkpackage(userId).then((res) => {
                    setMyPackage(res);
                })
                .catch((error) => {
                    setMyPackage([]);
                });   
        };
    useEffect(() => {
        getMyPackages();
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
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Main</span>
                                </li>
                                <li>
                                    <a href="/operator/dashboard" className="d-flex align-items-center">
                                        <i className="isax isax-grid-55"></i> Dashboard
                                    </a>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/operator/tours" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Tours
                                        </a>
                                        {/* <span className="msg-count rounded-circle">02</span> */}
                                    </div>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/operator/schedules" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Schedules
                                        </a>
                                        {/* <span className="msg-count rounded-circle">02</span> */}
                                    </div>
                                </li>
                                <li className="submenu">
                                    <a href="/operator/booking" className="d-block">
                                        <i className="isax isax-calendar-tick5"></i>
                                        <span> Bookings</span>
                                    </a>

                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/note" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Notes
                                        </a>
                                        {/* <span className="msg-count rounded-circle">02</span> */}
                                    </div>
                                </li>
                                {mypackage.length !==0 && mypackage.tourGuideFunction ?(
                                <li className="mb-2">
                                    <a href="/operator/guides" className="d-flex align-items-center">
                                        <i className="isax isax-heart5"></i> TourGuides
                                    </a>
                                </li>
                                ):(
                                    <li></li>
                                ) }
                                <li>
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Finance</span>
                                </li>
                                <li>
                                    <a href="/operator/package" className="d-flex align-items-center">
                                        <i className="isax isax-magic-star5"></i> Transactions
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div>
                                <li>
                                    <span className="fs-14 text-gray-3 fw-medium mb-2">Main</span>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/guide/schedule" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Schedules
                                        </a>
                                        {/* <span className="msg-count rounded-circle">02</span> */}
                                    </div>
                                </li>
                                <li>
                                    <div className="message-content">
                                        <a href="/note" className="d-flex align-items-center">
                                            <i className="isax isax-message-square5"></i> Note
                                        </a>
                                        {/* <span className="msg-count rounded-circle">02</span> */}
                                    </div>
                                </li>
                            </div>
                        )}
                        

                        <li>
                            <span className="fs-14 text-gray-3 fw-medium mb-2">Account</span>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="d-flex align-items-center"
                            >
                                <i className="isax isax-profile-tick5"></i> My Profile
                            </a>
                        </li>
                        {/* <li>
                            <div className="message-content">
                                <a href="notification.html" className="d-flex align-items-center">
                                    <i className="isax isax-notification-bing5"></i> Notifications
                                </a>
                                <span className="msg-count bg-purple rounded-circle">05</span>
                            </div>
                        </li> */}
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

export default OpeSidebar;