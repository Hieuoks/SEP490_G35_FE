import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { getBookingByDepartId } from "../../../services/bookingService";
import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPencilAlt } from "react-icons/fa";
const BookingDepartCom = () => {
    const [BookingRes, setBookingRes] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const { departureDateId } = useParams();
    const [bookingId, setBookingId] = useState("");
    const [departureDate, setDepartureDate] = useState("");

    const fetchPackages = async () => {
        console.log("req", departureDateId);
        try {
            const response = await getBookingByDepartId(departureDateId);
            const data = response.data.bookings;
            const sortedBookings = [...data].sort((a, b) => {
                const dateA = new Date(a.booking.bookingDate);
                const dateB = new Date(b.booking.bookingDate);
                return dateB - dateA; // Giảm dần (mới nhất trước)
            });
            const searched = keyword
                ? sortedBookings.filter(item =>
                    item.billingInfo?.email.toLowerCase().includes(keyword.toLowerCase()))
                : sortedBookings;

            setBookingRes(searched);
            console.log("API response:", data);
        } catch (error) {
            setBookingRes([]);
            console.error("Error fetching packages:", error);
        }
    };
    useEffect(() => {
        fetchPackages();
    }, [keyword]);

    // Tính toán pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = BookingRes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(BookingRes.length / itemsPerPage);

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


    return (
        <div className="col-xl-9 col-lg-8">
            {/* <!-- Booking Header --> */}
            <div className="card booking-header border-0">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                    <div>
                        <h6 className="mb-1">{Cookies.get("tourTitle") || "No titlte"}</h6>
                        <p className="fs-14 text-gray-6 fw-normal ">Depart Date: {new Date(Cookies.get("Depart")).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>
            </div>
            {/* <!-- /Booking Header --> */}

            {/* <!-- Hotel-Booking List --> */}
            <div className="card hotel-list">
                <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="">Booking List</h6>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon-start  me-2 position-relative">
                                <span className="icon-addon">
                                    <i className="isax isax-search-normal-1 fs-14"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="Search" value={keyword} onChange={(e) => {
                                    setKeyword(e.target.value);
                                    // Reset to page 1 when searching
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
                                    <th>Booked By</th>
                                    <th>Guest</th>
                                    <th>Pricing</th>
                                    <th>Booked on</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>No bookings found.</td>
                                    </tr>
                                ) : (
                                    currentItems.map((booking) => (
                                        <tr key={booking.bookingId}>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">{booking.bookingId}</a></td>

                                            <td>
                                                <h6 className="fs-14 mb-1">{booking.billingInfo.email}</h6>
                                                {/* <span className="fs-14 fw-normal text-gray-6"></span> */}
                                            </td>
                                            <td>
                                                <span className="fs-14 fw-normal text-gray-6">{booking.guest.numberOfAdults} adults, {booking.guest.numberOfChildren} children, {booking.guest.numberOfInfants} infants</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">{booking.paymentInfo.totalPrice}</h6>
                                                {/* <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span> */}
                                            </td>
                                            <td>{new Date(booking.booking.bookingDate).toLocaleString('en-GB')}</td>
                                            <td>
                                                {booking.paymentInfo.paymentStatus === "Paid" ? (
                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Paid
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>UnPaid
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${booking.bookingId}`} className="me-4">
                                                        <FaEye />
                                                    </a>
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#Update${booking.bookingId}`} className="me-4" onClick={() => {
                                                        setBookingId(booking.bookingId);
                                                    }}>
                                                        <FaEdit />
                                                    </a>
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
                    <span>Show</span>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <span>entries</span>
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
            {currentItems.length === 0 ? (
                <div>No content</div>
            ) : (
                currentItems.map((booking) => (
                    <div key={booking.bookingId}>
                        <div className="modal fade" id={`View${booking.bookingId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" >
                            <div className="modal-dialog  modal-dialog-centered modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5>Booking Info <span className="fs-14 fw-medium text-primary">#{booking.bookingId}</span></h5>
                                        <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                    </div>
                                    <div className="modal-body">
                                        <div className="upcoming-content">
                                            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                                                <div className="d-flex align-items-center flex-wrap">
                                                    {/* <div className="me-2">
                                                    <img src="assets/img/hotels/hotel-13.jpg" alt="image" className="avatar avartar-md avatar-rounded" />
                                                    </div> */}
                                                    <div>
                                                        <h6 className="mb-1">{booking.tour.title}</h6>
                                                        <div className="title-list">
                                                            <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal"><i className="isax isax-building me-2"></i>{booking.companyName}</p>
                                                            {/* <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal"><i className="isax isax-location5 me-2"></i>15/C Prince Dareen Road, New York</p> */}
                                                            {/* <p className="d-flex align-items-center pe-2 me-2  fw-normal"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>(400 Reviews)</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {booking.paymentInfo.bookingStatus === "Completed" ? (
                                                        <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Completed
                                                        </span>
                                                    ) : booking.paymentInfo.bookingStatus === "Canceled" ? (
                                                        <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Canceled
                                                        </span>
                                                    ) : (
                                                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Tour Details</h6>
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Max slot</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.tour.maxSlots}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Transportation</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.tour.transportation}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">StartPoint</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.tour.startPoint}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Guests</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.guest.numberOfAdults} adults, {booking.guest.numberOfChildren} children, {booking.guest.numberOfInfants} infants.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Booking Info</h6>
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Booked On</h6>
                                                        <p className="text-gray-6 fs-16 ">{new Date(booking.booking.bookingDate).toLocaleString('en-GB')}</p>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Contract</h6>
                                                        <p className="text-gray-6 fs-16 ">
                                                            <a className="text-primary" href={booking.booking.contract} target="_blank">View Contract</a>
                                                        </p>
                                                    </div>

                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">No of Days Stay</h6>
                                                        <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Customer Note </h6>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-lg">
                                                        <p className="text-gray-6 fs-16 ">{booking.booking.noteForTour}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Billing Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Name</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.billingInfo.username}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Email</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.billingInfo.email}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Phone</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.billingInfo.phone}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Address</h6>
                                                        <p className="text-gray-6 fs-16 ">{booking.billingInfo.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="upcoming-details">
                                            <h6 className="mb-2">Extra Charge</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg">
                                                    <h6 className="fs-14">Fee Change Departure Ha Noi into Da Nang </h6>
                                                    <p className="text-success fs-16 ">100$</p>
                                                </div>
                                            </div>
                                        </div> */}
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Payment Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Total Price</h6>
                                                        <p className="text-primary fs-16 ">{booking.paymentInfo.totalPrice}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Payment Status</h6>
                                                        {booking.paymentInfo.paymentStatus === "Paid" ? (
                                                            <p className="text-success fs-16 ">Paid</p>
                                                        ) : (
                                                            <p className="text-danger fs-16 ">Unpaid</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-dismiss="modal">Close</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                ))
            )}
        </div>
    );
}
export default BookingDepartCom;

