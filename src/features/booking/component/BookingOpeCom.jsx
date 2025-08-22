import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getOperatorBooking, updateContract, updateBookingStatus, updatePaymentStatus } from "../../../services/bookingService";
import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPencilAlt } from "react-icons/fa";
const BookingOpeCom = () => {
    const [BookingRes, setBookingRes] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const fetchPackages = async (keyword) => {
        try {
            const data = await getOperatorBooking(keyword);
            setBookingRes(data.bookings);
            console.log("API response:", data.bookings);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };
    useEffect(() => {

        fetchPackages(keyword);
    }, [keyword]);

    // Sắp xếp danh sách theo ngày book giảm dần (mới nhất lên đầu)
    const sortedBookings = [...BookingRes].sort((a, b) => {
        const dateA = new Date(a.booking.bookingDate);
        const dateB = new Date(b.booking.bookingDate);
        return dateB - dateA; // Giảm dần (mới nhất trước)
    });

    // Tính toán pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

    // Reset về trang 1 khi thay đổi keyword
    useEffect(() => {
        setCurrentPage(1);
    }, [keyword]);

    // Hàm chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hàm thay đổi số items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const [contract, setContract] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [bookingId, setBookingId] = useState("");
    // Hàm xử lý update
    const handleUpdate = (e) => {
        e.preventDefault();

        console.log("Update booking:", bookingId, contract, bookingStatus, paymentStatus);
        if (contract !== "") {
            updateContract(bookingId, contract)
                .then((response) => {
                    toast.success("Contract updated successfully");
                    console.log("Contract updated successfully:", response);
                    setBookingRes((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking.bookingId === bookingId ? { ...booking, contract: contract } : booking
                        )
                    );
                    fetchPackages(keyword);
                    // Reset contract input after successful update
                })
                .catch((error) => {
                    console.error("Error updating contract:", error);
                    toast.error("Failed to update contract");
                });
        }

        if (paymentStatus !== "") {
            updatePaymentStatus(bookingId, paymentStatus)
                .then((response) => {
                    toast.success("Payment status updated successfully");
                    console.log("Payment status updated successfully:", response);
                    setBookingRes((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking.bookingId === bookingId ? { ...booking, paymentStatus: paymentStatus } : booking
                        )
                    );
                    // Reset payment status input after successful update
                })
                .catch((error) => {
                    console.error("Error updating payment status:", error);
                    toast.error("Failed to update payment status");
                });
        }
        setContract("");
        setBookingStatus("");
        setPaymentStatus("");

        navigate("/operator/booking");
    };


    // ...existing code...
return (
    <div className="col-xl-9 col-lg-8">
        {/* <!-- Booking Header --> */}
        <div className="card booking-header border-0">
            <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                <div>
                    <h6 className="mb-1">Danh sách đặt tour</h6>
                    <p className="fs-14 text-gray-6 fw-normal ">Tổng số:  {BookingRes.length}</p>
                </div>
            </div>
        </div>
        {/* <!-- /Booking Header --> */}

        {/* <!-- Hotel-Booking List --> */}
        <div className="card hotel-list">
            <div className="card-body p-0">
                <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Danh sách đặt tour</h6>
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="input-icon-start  me-2 position-relative">
                            <span className="icon-addon">
                                <i className="isax isax-search-normal-1 fs-14"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Tìm kiếm" value={keyword} onChange={(e) => {
                                setKeyword(e.target.value);
                            }} />
                        </div>
                    </div>
                </div>

                {/* <!-- Hotel List --> */}
                <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Tour</th>
                                <th>Ngày khởi hành</th>
                                <th>Người đặt</th>
                                <th>Khách</th>
                                <th>Giá</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>Không có đơn đặt nào.</td>
                                </tr>
                            ) : (
                                currentItems.map((booking) => (
                                    <tr key={booking.bookingId}>
                                        <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">{booking.bookingId}</a></td>
                                        <td>
                                            <div>
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">{booking.tour.title}</a></p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="fs-14 fw-normal text-gray-6">{new Date(booking.tour.departureDate).toLocaleDateString('vi-VN')}</span>
                                        </td>
                                        <td>
                                            <h6 className="fs-14 mb-1">{booking.billingInfo.username}</h6>
                                        </td>
                                        <td>
                                            <span className="fs-14 fw-normal text-gray-6">{booking.guest.numberOfAdults} người lớn, {booking.guest.numberOfChildren} trẻ em, {booking.guest.numberOfInfants} em bé</span>
                                        </td>
                                        <td>
                                            <h6 className="fs-14 mb-1">{booking.paymentInfo.totalPrice}</h6>
                                        </td>
                                        <td>{new Date(booking.booking.bookingDate).toLocaleString('vi-VN')}</td>
                                        <td>
                                            {booking.paymentInfo.bookingStatus === "Completed" ? (
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                    <i className="fa-solid fa-circle fs-5 me-1"></i>Hoàn thành
                                                </span>
                                            ) : booking.paymentInfo.bookingStatus === "Canceled" ? (
                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                    <i className="fa-solid fa-circle fs-5 me-1"></i>Đã huỷ
                                                </span>
                                            ) : (
                                                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                    <i className="fa-solid fa-circle fs-5 me-1"></i>Chờ xử lý
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${booking.bookingId}`} className="me-4">
                                                    <FaEye />
                                                </a>
                                                {new Date(booking.tour.departureDate) > tomorrow ? (
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#Update${booking.bookingId}`} className="me-4" onClick={() => {
                                                        setBookingId(booking.bookingId);
                                                    }}>
                                                        <FaEdit />
                                                    </a>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <!-- /Hotel List --> */}
            </div>
        </div>
        {/* <!-- /Hotel-Booking List --> */}

        {/* <!-- Pagination --> */}
        <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
            <div className="value d-flex align-items-center">
                <span>Hiển thị</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <span>dòng</span>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <button
                    className="btn btn-link p-0 me-3"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                <nav aria-label="Page navigation">
                    <ul className="paginations d-flex justify-content-center align-items-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className="page-item me-2">
                                <button
                                    className={`page-link-1 d-flex justify-content-center align-items-center ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    className="btn btn-link p-0 ms-3"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
        {/* <!-- /Pagination --> */}
        {BookingRes.length === 0 ? (
            <div>Không có nội dung</div>
        ) : (
            BookingRes.map((booking) => (
                <div key={booking.bookingId}>
                    <div className="modal fade" id={`View${booking.bookingId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true" >
                        <div className="modal-dialog  modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Thông tin đặt tour <span className="fs-14 fw-medium text-primary">#{booking.bookingId}</span></h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>
                                <div className="modal-body">
                                    <div className="upcoming-content">
                                        <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div>
                                                    <h6 className="mb-1">{booking.tour.title}</h6>
                                                    <div className="title-list">
                                                        <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal"><i className="isax isax-building me-2"></i>{booking.companyName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {booking.paymentInfo.bookingStatus === "Completed" ? (
                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Hoàn thành
                                                    </span>
                                                ) : booking.paymentInfo.bookingStatus === "Canceled" ? (
                                                    <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Đã huỷ
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Chờ xử lý
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Chi tiết tour</h6>
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Số chỗ tối đa</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.tour.maxSlots}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Phương tiện</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.tour.transportation}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Điểm khởi hành</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.tour.startPoint}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Khách</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.guest.numberOfAdults} người lớn, {booking.guest.numberOfChildren} trẻ em, {booking.guest.numberOfInfants} em bé.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Thông tin đặt tour</h6>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <h6 className="fs-14">Ngày đặt</h6>
                                                    <p className="text-gray-6 fs-16 ">{new Date(booking.booking.bookingDate).toLocaleString('vi-VN')}</p>
                                                </div>
                                                <div className="col-lg-4">
                                                    <h6 className="fs-14">Hợp đồng</h6>
                                                    <p className="text-gray-6 fs-16 ">
                                                        <a className="text-primary" href={booking.booking.contract} target="_blank" rel="noopener noreferrer">Xem hợp đồng</a>
                                                    </p>
                                                </div>
                                                <div className="col-lg-4">
                                                    <h6 className="fs-14">Số ngày lưu trú</h6>
                                                    <p className="text-gray-6 fs-16 ">4 ngày, 5 đêm</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Ghi chú khách hàng</h6>
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg">
                                                    <p className="text-gray-6 fs-16 ">{booking.booking.noteForTour}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Thông tin khách hàng</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Tên</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.billingInfo.username}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Email</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.billingInfo.email}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Số điện thoại</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.billingInfo.phone}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Địa chỉ</h6>
                                                    <p className="text-gray-6 fs-16 ">{booking.billingInfo.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Thông tin thanh toán</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Tổng tiền</h6>
                                                    <p className="text-primary fs-16 ">{booking.paymentInfo.totalPrice}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Trạng thái thanh toán</h6>
                                                    {booking.paymentInfo.paymentStatus === "Paid" ? (
                                                        <p className="text-success fs-16 ">Đã thanh toán</p>
                                                    ) : (
                                                        <p className="text-danger fs-16 ">Chưa thanh toán</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-dismiss="modal">Đóng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={`Update${booking.bookingId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true" >
                        <div className="modal-dialog  modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Cập nhật đặt tour <span className="fs-14 fw-medium text-primary">#{booking.bookingId}</span></h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>

                                <div className="modal-body">
                                    <div className="upcoming-content">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Hợp đồng</label>
                                            <input type="file" className="form-control" onChange={(e) => { setContract(e.target.files[0]); }} placeholder="Nhập hợp đồng" />
                                        </div>
                                        <div className="row gy-3">
                                            <div className="col-lg-12">
                                                <label className="form-label">Trạng thái thanh toán</label>
                                                <select className="form-select" onChange={(e) => { setPaymentStatus(e.target.value); }}>
                                                    <option value="Paid" selected={booking.paymentInfo.paymentStatus === "Paid"}>Đã thanh toán</option>
                                                    <option value="Pending" selected={booking.paymentInfo.paymentStatus === "Pending"}>Chưa thanh toán</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-md btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Lưu</button>
                                    <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-dismiss="modal">Đóng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
);
// ...existing code...
}
export default BookingOpeCom;