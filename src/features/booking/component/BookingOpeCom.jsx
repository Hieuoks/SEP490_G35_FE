import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getBooking } from "../../../services/bookingService";

const BookingOpeCom = () => {
    const [BookingRes, setBookingRes] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 10;
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(data.length / itemsPerPage);
                useEffect(() => {
                                        const fetchPackages = async () => {
                                            try {
                                                const data = await getBooking(keyword);
                                                setBookingRes(data.items || data);
                                                console.log("API response:", data);
                                            } catch (error) {
                                                console.error("Error fetching packages:", error);
                                            }
                                        };
                                        fetchPackages();
                                    }, [keyword]);
    return (
    <div className="col-xl-9 col-lg-8">                    
                    {/* <!-- Booking Header --> */}
                    <div className="card booking-header border-0">
                        <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                            <div>
                                <h6 className="mb-1">Hotel Bookings</h6>
                                <p className="fs-14 text-gray-6 fw-normal ">No of Booking :  {BookingRes.length}</p>
                            </div>

                            <div className="d-flex align-items-center flex-wrap">
                                <div className="input-icon-start position-relative">
                                    <span className="icon-addon">
										<i className="isax isax-calendar-edit fs-14"></i>
									</span>
                                    <input type="text" className="form-control date-range bookingrange" placeholder="Select" value="Academic Year : 2024 / 2025"/>
                                </div>
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
                                        <input type="text" className="form-control" placeholder="Search"/>
                                    </div>
                                    <div className="dropdown me-3">
                                        <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
										Room Type
									</a>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Single Room</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Double Room</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Twin Room</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown me-3">
                                        <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
										Status
									</a>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Upcoming</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Cancelled</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Completed</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex align-items-center sort-by">
                                        <span className="fs-14 text-gray-9 fw-medium">Sort By :</span>
                                        <div className="dropdown">
                                            <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn rounded d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
										Recommended
										</a>
                                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* <!-- Hotel List --> */}
                            <div className="custom-datatable-filter table-responsive">
                                <table className="table datatable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Hotel</th>
                                            <th>Booked By</th>
                                            <th>Room & Guest</th>
                                            <th>Days</th>
                                            <th>Pricing</th>
                                            <th>Booked on</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">#HB-1245</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Athenee</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Barcelona</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Lynwood Dickens</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Barcelona</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Suite Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span>
                                            </td>
                                            <td>4 Days, 3 Nights</td>
                                            <td>$11,569</td>
                                            <td>15 May 2025</td>
                                            <td>
                                                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#upcoming"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">#HB-3215</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Luxe Haven</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">London</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">James Osborne</h6>
                                                <span className="fs-14 fw-normal text-gray-6">London</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Queen Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 2 Child</span>
                                            </td>
                                            <td>3 Days, 2 Nights</td>
                                            <td>$10,745</td>
                                            <td>20 May 2025</td>
                                            <td>
                                                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#upcoming"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">#HB-4581</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Urban Retreat</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Edinburgh</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Steve Grieve</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Edinburgh</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Single Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span>
                                            </td>
                                            <td>2 Days, 1 Night</td>
                                            <td>$8,160</td>
                                            <td>04 Jun 2025</td>
                                            <td>
                                                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#upcoming"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#completed">#HB-6545</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Grand Horizon</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Manchester</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">The Grand Horizon</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Manchester</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Balcony View</h6>
                                                <span className="fs-14 fw-normal text-gray-6">3 Adults, 2 Child</span>
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>$14,840</td>
                                            <td>17 Jun 2025</td>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Completed</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#completed"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#cancelled">#HB-3256</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Serene Valley</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Chelsea</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Hotel Serene Valley</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Manchester</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">City View</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Chelsea</span>
                                            </td>
                                            <td>3 Days, 2 Nights</td>
                                            <td>$10,450</td>
                                            <td>25 Jun 2025</td>
                                            <td>
                                                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#upcoming"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#cancelled">#HB-3654</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Evergreen</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Las Vegas</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Hotel Evergreen</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Las Vegas</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Suite Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span>
                                            </td>
                                            <td>4 Days, 3 Nights</td>
                                            <td>$12,600</td>
                                            <td>02 Jul 2025</td>
                                            <td>
                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Cancelled</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#cancelled"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#completed">#HB-1458</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Stardust Hotel</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Salford</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Stardust Hotel</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Salford</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Suite Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 2 Child</span>
                                            </td>
                                            <td>2 Days, 1 Night</td>
                                            <td>$9,380</td>
                                            <td>12 Jul 2025</td>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Completed</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#completed"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#completed">#HB-6589</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Plaza</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Newyork</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Hotel Plaza</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Newyork</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Single Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">1 Adult, 1 Child</span>
                                            </td>
                                            <td>3 Days, 2 Nights</td>
                                            <td>$10,400</td>
                                            <td>26 Jul 2025</td>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Completed</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#completed"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#completed">#HB-2315</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Skyline Vista</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Cambridge</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Hotel Skyline Vista</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Cambridge</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Queen Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span>
                                            </td>
                                            <td>4 Days, 3 Nights</td>
                                            <td>$12,810</td>
                                            <td>10 Aug 2025</td>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Completed</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#completed"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#completed">#HB-5414</a></td>
                                            <td>
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Aurora Bliss</a></p>
                                                    <span className="fs-14 fw-normal text-gray-6">Bristol</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Hotel Aurora Bliss</h6>
                                                <span className="fs-14 fw-normal text-gray-6">Bristol</span>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">Suite Room</h6>
                                                <span className="fs-14 fw-normal text-gray-6">2 Adults, 1 Child</span>
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>$15,450</td>
                                            <td>22 Aug 2025</td>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Completed</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#completed"><i className="isax isax-eye"></i></a>
                                                </div>
                                            </td>
                                        </tr>
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
                            <select>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <a href="javascript:void(0);"><span className="me-3"><i className="isax isax-arrow-left-2"></i></span></a>
                            <nav aria-label="Page navigation">
                                <ul className="paginations d-flex justify-content-center align-items-center">
                                    <li className="page-item me-2"><a className="page-link-1 active d-flex justify-content-center align-items-center " href="javascript:void(0);">1</a></li>
                                    <li className="page-item me-2"><a className="page-link-1 d-flex justify-content-center align-items-center" href="javascript:void(0);">2</a></li>
                                    <li className="page-item "><a className="page-link-1 d-flex justify-content-center align-items-center" href="javascript:void(0);">3</a></li>
                                </ul>
                            </nav>
                            <a href="javascript:void(0);"><span className="ms-3"><i className="isax isax-arrow-right-3"></i></span></a>
                        </div>
                    </div>
                    {/* <!-- /Pagination --> */}
                </div>
  );
}
export default BookingOpeCom;