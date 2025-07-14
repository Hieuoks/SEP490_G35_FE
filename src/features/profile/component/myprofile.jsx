import React, { useState, useEffect } from "react";
import { getProfile } from "../../../services/profileService";

/*
    Sửa lại file này để dùng cú pháp JSX đúng chuẩn React.
    - Đổi tất cả class thành className.
    - Đổi thẻ HTML comment <!-- --> thành comment JS.
    - Đổi src ảnh thành đường dẫn hợp lệ nếu cần.
    - Đổi các thuộc tính không hợp lệ (multiple="" => multiple, v.v.).
*/


const MyProfile = () => {
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
                <div className="col-xl-9 col-lg-8">
                        <div className="card shadow-none mb-0">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                        <h6>My Profile</h6>
                                        <div className="d-flex align-items-center justify-content-center">
                                                <a href="profile-settings.html" className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center">
                                                        <i className="isax isax-edit-2 fs-14"></i>
                                                </a>
                                        </div>
                                </div>
                                <div className="card-body">
                                        <h6 className="fs-16 mb-3">Basic Information</h6>
                                        <div className="d-flex align-items-center mb-3">
                                                <span className="avatar avatar-xl flex-shrink-0 me-3 ">
                                                        <img src={userResponse?.avatar} alt="Img" className="img-fluid rounded" />
                                                </span>
                                        </div>
                                        <div className="row border-bottom pb-2 mb-3">
                                                <div className="col-md-6">
                                                        <div className="mb-2">
                                                                <h6 className="fs-14">Full Name</h6>
                                                                <p>{userResponse?.userName}</p>
                                                        </div>
                                                </div>
                                                <div className="col-md-6">
                                                        <div className="mb-2">
                                                                <h6 className="fs-14">Email</h6>
                                                                <p>
                                                                        <a href={`mailto:${userResponse?.email}`} className="__cf_email__">
                                                                                {userResponse?.email}
                                                                        </a>
                                                                </p>
                                                        </div>
                                                </div>
                                                <div className="col-md-6">
                                                        <div className="mb-2">
                                                                <h6 className="fs-14">Phone</h6>
                                                                <p>{userResponse?.phoneNumber}</p>
                                                        </div>
                                                </div>
                                        </div>
                                        <h6 className="fs-16 mb-3">Address Information</h6>
                                        <div className="row g-2">
                                                <div className="col-md-12">
                                                        <div>
                                                                <h6 className="fs-14">Address</h6>
                                                                <p>{userResponse?.address}</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default MyProfile;