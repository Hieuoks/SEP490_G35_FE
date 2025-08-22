import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getTourGuides, deleteTourGuide, addTourGuide } from "../../../services/tourGuideService";
const ListGuideCom = () => {
    const [guides, setGuides] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [formData, setFormData] = useState({
        email: '', userName: '', phoneNumber: '', address: '', avatar: 'string', password: '123456'
    });
    const fetchGuides = async () => {
        try {
            const response = await getTourGuides(searchString, pageNumber, pageSize);
            const data = response.tourGuides;
            setGuides(data.items || data);
            setTotalItems(response.totalCount);
            setTotalPages(response.totalPages);
            console.log("Fetched guides:", data);
            // tuỳ vào cấu trúc response
        } catch (error) {
            setGuides([]);
            console.error("Failed to fetch accounts:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGuides();
    }, [searchString, pageNumber, pageSize]);
    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };
    // Thay đổi số dòng/trang
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };
    const handleDelete = async (tourguideId) => {

        try {
            const response = await deleteTourGuide(tourguideId);
            toast.success('Delete successfully');
            console.log("Delete updated successfully:", response);
            setLoading(true);
            fetchGuides(); // Refresh the list after deletion
            console.log("Delete tour guide", tourguideId);
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAdd = () => {
        if (validate()) {
            addTourGuide(formData)
                .then(response => {
                    console.log('Tour guide added successfully:', response);
                    toast.success('Tour guide added successfully!');
                    setFormData({ email: '', userName: '', phoneNumber: '', address: '', avatar: 'string', password: 123456 });
                    setErrors({});
                    fetchGuides(); // Refresh the list after adding

                })
                .catch(error => {
                    setErrors(error.message || {});
                    console.error('Failed to add tour guide:', error);
                    toast.error(error.response?.data);
                    setErrors({ api: 'Failed to add tour guide. Please try again.' });
                });
        }
        console.log('Form is valid:', formData);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
    <div className="col-xl-9 col-lg-8 theiaStickySidebar">

        {/* <!-- Booking Header --> */}
        <div className="card booking-header">
            <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                <div>
                    <h6>Hướng dẫn viên</h6>
                    <p className="fs-14 text-gray-6 fw-normal ">Tổng số: {totalItems}</p>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                    <a className="btn btn-md btn-primary me-2" data-bs-toggle="modal" data-bs-target="#upcoming" href="javascript:void(0);">
                        <FaPlus className="me-1" /> Thêm hướng dẫn viên
                    </a>
                </div>
            </div>
        </div>
        {/* <!-- /Booking Header --> */}

        {/* <!-- Account List --> */}
        <div className="card hotel-list">
            <div className="card-body p-0">

                <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Danh sách tài khoản</h6>
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="input-icon-start  me-2 position-relative">
                            <span className="icon-addon">
                                <i className="isax isax-search-normal-1 fs-14"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Tìm kiếm" value={searchString} onChange={(e) => {
                                setSearchString(e.target.value);
                                setPageNumber(1); // reset về trang 1 khi search
                            }} />
                        </div>
                    </div>
                </div>

                <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Đang tải...</td>
                                </tr>
                            ) : guides.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>Không tìm thấy tài khoản nào.</td>
                                </tr>
                            ) : (
                                guides.map((guide) => (
                                    <tr key={guide.userId}>
                                        <td><a className="link-primary fw-medium" >#{guide.userId}</a></td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a className="avatar avatar-lg"><img src={guide.avatar} className="img-fluid rounded-circle" onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                }} /></a>
                                                <div className="ms-2">
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="flight-details.html">{guide.email}</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">{guide.userName}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{guide.phoneNumber}</td>
                                        <td>{guide.address}</td>
                                        <td>
                                            <a href="javascript:void(0);" onClick={() => handleDelete(guide.tourGuideId)} >
                                                <FaTrash></FaTrash>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/* paging */}
        <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
            <div className="value d-flex align-items-center">
                <span>Hiển thị</span>
                <select value={pageSize} onChange={handlePageSizeChange} className="form-select form-select-sm ms-2 me-2">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <span>dòng</span>
            </div>
            <nav className="pagination-nav">
                <ul className="pagination justify-content-center">
                    {/* Previous Button */}
                    <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="javascript:void(0);"
                            aria-label="Trước"
                            onClick={() => handlePageChange(pageNumber - 1)}
                        >
                            <span aria-hidden="true"><FaChevronLeft /></span>
                        </a>
                    </li>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNum = index + 1;
                        const isActive = pageNum === pageNumber;

                        return (
                            <li key={pageNum} className={`page-item ${isActive ? 'active' : ''}`}>
                                <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </a>
                            </li>
                        );
                    })}

                    {/* Next Button */}
                    <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="javascript:void(0);"
                            aria-label="Sau"
                            onClick={() => handlePageChange(pageNumber + 1)}
                        >
                            <span aria-hidden="true"><FaChevronRight /></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="modal fade" id="upcoming" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Thêm hướng dẫn viên</h5>
                        <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                    </div>
                    <div className="modal-body">
                        <div className="upcoming-content">

                            <div className="upcoming-details ">
                                <h6 className="mb-2">Thông tin</h6>
                                <div className="row">
                                    <div className="col-lg-12 me-3 mb-2">
                                        <h6 className="fs-14">Email</h6>
                                        <input type="text" name="email" className="form-control" placeholder="Nhập email" onChange={handleChange} />
                                        {errors.email && <div className="text-danger fs-14 mt-1">{errors.email}</div>}
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <h6 className="fs-14">Tên người dùng</h6>
                                        <input type="text" name="userName" className="form-control" placeholder="Nhập tên người dùng" onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <h6 className="fs-14">Số điện thoại</h6>
                                        <input type="text" name="phoneNumber" className="form-control" placeholder="Nhập số điện thoại" onChange={handleChange} />
                                        {errors.phoneNumber && <div className="text-danger fs-14 mt-1">{errors.phoneNumber}</div>}
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <h6 className="fs-14">Địa chỉ</h6>
                                        <input type="text" name="address" className="form-control" placeholder="Nhập địa chỉ" onChange={handleChange} />
                                        {errors.UserName && <div className="text-danger fs-14 mt-1">{errors.UserName}</div>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-md btn-primary" onClick={handleAdd}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
export default ListGuideCom;