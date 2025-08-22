import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../services/profileService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "antd";
const ProfileSetting = () => {
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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        UserId: '' , UserName:'', Email: '', 
        Address: '', PhoneNumber: '', AvatarFile: '',AvatarPreview: ''
      });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(formData.PhoneNumber)) {
            newErrors.PhoneNumber = 'Phone number must be 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
        const file = files[0];
        setFormData(prev => ({
            ...prev,
            [name]: file,
            // Tạo URL tạm để xem trước ảnh
            AvatarPreview: file ? URL.createObjectURL(file) : ""
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updateProfile(formData)
                .then(response => {
                    console.log('Profile updated successful:', response);
                    toast.success('Profile updated successfully!');
                    setFormData({   UserId: '' , UserName:'', Email: '', 
                                    Address: '', PhoneNumber: '', AvatarFile: '',AvatarPreview: ''});
                    setErrors({});
                    navigate('/profile');
                })
                .catch(error => {
                    console.error('Profile update failed:', error);
                    toast.error('Profile update failed.');
                    setErrors({ api: 'Profile update failed. Please try again.' });
                });
                console.log('Form is valid:', formData);
                 // Redirect to profile settings page after successful update
        }
    };
    useEffect(() => {
    if (userResponse) {
        setFormData({
            UserId: userResponse.userId,
            UserName: userResponse.userName,
            Email: userResponse.email,
            Address: userResponse.address,
            PhoneNumber: userResponse.phoneNumber,
            AvatarFile: userResponse.avatar
        });
    }
}, [userResponse]);
    
    return(
    <div className="col-xl-9 col-lg-8">
        <div className="card settings mb-0">
            <div className="card-header">
                <h6>Cài đặt</h6>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="card-body pb-3">
                    <div className="settings-link d-flex align-items-center flex-wrap">
                        <a href="profile-settings.html" className="active ps-3"><i className="isax isax-user-octagon me-2"></i>Cài đặt hồ sơ</a>
                        <a href="notification-settings.html"><i className="isax isax-notification me-2"></i>Thông báo</a>
                    </div>
                    {/* Settings Content */}
                    <div className="settings-content mb-3">
                        <h6 className="fs-16 mb-3">Thông tin cơ bản</h6>
                        <div className="row gy-2">
                            <div className="col-lg-12">
                                <div className="d-flex align-items-center">
                                    <img src={formData.AvatarPreview || formData?.AvatarFile} alt="image" className="img-fluid avatar avatar-xxl br-10 flex-shrink-0 me-3" />
                                    <div>
                                        <p className="fs-14 text-gray-6 fw-normal mb-2">Kích thước đề xuất là 400 x 400 pixel.</p>
                                        <div className="d-flex align-items-center">
                                            <div className="me-2">
                                                <label className="upload-btn" htmlFor="fileUpload">Tải lên</label>
                                                <input type="file" id="fileUpload" style={{display: "none"}} name="AvatarFile" onChange={handleChange}/>
                                            </div>
                                            <button type="button" className="btn btn-light btn-md">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                                {errors.AvatarFile && <div className="text-danger fs-14 mt-1">{errors.AvatarFile}</div>}
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <label className="form-label">Họ và tên</label>
                                    <input type="text" name="UserName" className="form-control" value={formData?.UserName} onChange={handleChange}/>
                                    {errors.UserName && <div className="text-danger fs-14 mt-1">{errors.UserName}</div>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={formData?.Email} readOnly/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="phone" name="PhoneNumber" className="form-control" value={formData?.PhoneNumber} onChange={handleChange}/>
                                    {errors.PhoneNumber && <div className="text-danger fs-14 mt-1">{errors.PhoneNumber}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="settings-content">
                        <h6 className="fs-16 mb-3">Thông tin địa chỉ</h6>
                        <div className="row gy-2">
                            <div className="col-lg-12">
                                <div>
                                    <label className="form-label">Địa chỉ</label>
                                    <input type="text" name="Address" className="form-control" value={formData?.Address} onChange={handleChange}/>
                                    {errors.Address && <div className="text-danger fs-14 mt-1">{errors.Address}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Settings Content*/}
                </div>
                <div className="card-footer">
                    <div className="d-flex align-items-center justify-content-end">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
);
}

export default ProfileSetting;