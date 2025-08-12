import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaListAlt, FaStar } from 'react-icons/fa';
import { getTotalTour, getTotalBooking, getTotalEarnings, getTotalReviews } from '../../../services/dashboardService';
import { useState, useEffect } from 'react';
const OpeDashCom = () => {
    const [totalTour, setTotalTour] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [latestInvoices, setLatestInvoices] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [totalTourData, totalBookingData, totalEarningsData, totalReviewsData] = await Promise.all([
                    getTotalTour(),
                    getTotalBooking(),
                    getTotalEarnings(),
                    getTotalReviews(),
                ]);

                setTotalTour(totalTourData);
                setTotalBooking(totalBookingData);
                setTotalEarnings(totalEarningsData);
                setTotalReviews(totalReviewsData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchLatestInvoices = async () => {
            const latestInvoicesData = await getLatestInvoices(5);
            setLatestInvoices(latestInvoicesData);
        };
        fetchLatestInvoices();
    }, []);
    return (
        <div className="col-xl-9 col-lg-8">
            <div className="row">
                <div className="col-xl-3 col-sm-6 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body text-center">
                            <span className="avatar avatar rounded-circle bg-success mb-2">
                                <FaCalendarAlt className="fs-24" />
                            </span>
                            <p className="mb-1">Total Bookings</p>
                            <h5 className="mb-2">{totalBooking}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body text-center">
                            <span className="avatar avatar rounded-circle bg-orange mb-2">
                                <FaListAlt className="fs-24" />
                            </span>
                            <p className="mb-1">Total Tours</p>
                            <h5 className="mb-2">{totalTour}</h5>
                            <a href="agent-listings.html" className="fs-14 link-primary text-decoration-underline">View All</a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body text-center">
                            <span className="avatar avatar rounded-circle bg-info mb-2">
                                <FaMoneyBillWave className="fs-24" />
                            </span>
                            <p className="mb-1">Total Earnings</p>
                            <h5 className="mb-2">{totalEarnings} VND</h5>
                            <p className="d-flex align-items-center justify-content-center fs-14"><i className="isax isax-arrow-down5 me-1 text-danger"></i>15% From Last Month </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body text-center">
                            <span className="avatar avatar rounded-circle bg-indigo mb-2">
                                <FaStar className="fs-24" />
                            </span>
                            <p className="mb-1">Total Reviews</p>
                            <h5 className="mb-2">{totalReviews}</h5>
                            <a href="agent-review.html" className="fs-14 link-primary text-decoration-underline">View All</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                {/* <!-- Bookings Statistics --> */}
                {/* <div className="col-xl-4 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6>Bookings Statistics</h6>
                                <div className="dropdown ">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6"></i>2025
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2025
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2024
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2023
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center mb-3">
                                <div id="booking-chart"></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="border-icon teal">Hotels</h6>
                                <p className="fs-14"><span className="text-gray-9 fw-medium">16</span> Bookings</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="border-icon secondary">Flights</h6>
                                <p className="fs-14"><span className="text-gray-9 fw-medium">12</span> Bookings</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="border-icon purple">Cars</h6>
                                <p className="fs-14"><span className="text-gray-9 fw-medium">14</span> Bookings</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="border-icon dark">Cruise</h6>
                                <p className="fs-14"><span className="text-gray-9 fw-medium">16</span> Bookings</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-0">
                                <h6 className="border-icon primary">Tour</h6>
                                <p className="fs-14"><span className="text-gray-9 fw-medium">04</span> Bookings</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- /Bookings Statistics --> */}

                {/* <!-- Earnings --> */}
                {/* <div className="col-xl-8 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6>Earnings</h6>
                                <div className="dropdown ">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6"></i>2025
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2025
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2024
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                <i className="ti ti-point-filled me-1"></i>2023
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="mb-2">
                                        <p className="mb-0">Total Earnings this Year</p>
                                        <h3>$20,659</h3>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <p className="fs-14"><span className="badge badge-soft-success badge-md border border-success rounded-pill me-2"><i className="isax isax-arrow-up-3 "></i>12%</span>vs last years</p>
                                    </div>
                                </div>
                                <div id="earning-chart"></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- /Earnings -->                         */}

            </div>

            <div className="row">

                {/* <!-- Recently Added --> */}
                <div className="col-xl-6 col-xxl-5 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body">
                            <h6 className="mb-4">Recently Added</h6>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <a href="hotel-details.html" className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src="assets/img/hotels/hotel-20.jpg" className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href="hotel-details.html">The Grand Horizon</a> <span className="badge badge-soft-info badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Hotels</span></h6>
                                        <p className="fs-14">Last Booked : 25 Apr 2025</p>
                                    </div>
                                </div>
                                <a href="agent-hotel-booking.html" className="btn rebook-btn btn-sm">06 Bookings</a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <a href="tour-details.html" className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src="assets/img/tours/tours-28.jpg" className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href="tour-details.html">Dare DevCon</a> <span className="badge badge-soft-pink badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Tour</span></h6>
                                        <p className="fs-14">Last Booked : 16 May 2025</p>
                                    </div>
                                </div>
                                <a href="agent-tour-booking.html" className="btn rebook-btn btn-sm">12 Bookings</a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <a href="flight-details.html" className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src="assets/img/flight/flight-05.jpg" className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href="flight-details.html">Altair 333</a> <span className="badge badge-soft-teal badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Flight</span></h6>
                                        <p className="fs-14">Last Booked : 25 May 2025</p>
                                    </div>
                                </div>
                                <a href="agent-flight-booking.html" className="btn rebook-btn btn-sm">14 Bookings</a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <a href="cruise-details.html" className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src="assets/img/cruise/cruise-28.jpg" className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href="cruise-details.html">Oceania Cruises</a> <span className="badge badge-soft-cyan badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Cruise</span></h6>
                                        <p className="fs-14">Last Booked : 18 Jun 2025</p>
                                    </div>
                                </div>
                                <a href="agent-cruise-booking.html" className="btn rebook-btn btn-sm">22 Bookings</a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <a href="tour-details.html" className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src="assets/img/tours/tours-26.jpg" className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href="tour-details.html">Fitness Frenzy</a> <span className="badge badge-soft-pink badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Tour</span></h6>
                                        <p className="fs-14">Last Booked : 25 May 2025</p>
                                    </div>
                                </div>
                                <a href="agent-tour-booking.html" className="btn rebook-btn btn-sm">40 Bookings</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /Recently Added --> */}

                {/* <!-- Recent Invoices --> */}
                <div className="col-xxl-7 col-xl-6 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
                                <h6>Latest Invoices</h6>
                            </div>
                            <div className="card shadow-none mb-4">
                                <div className="card-body p-2">
                                    <div className="d-flex justify-content-between align-items-center flex-fill">
                                        <div>
                                            <div className="d-flex align-items-center flex-wrap mb-1">
                                                <a href="invoices.html" className="fs-14 link-primary border-end pe-2 me-2 mb-0">#INV12565</a>
                                                <p className="fs-14">Date: 15 May 2024</p>
                                            </div>
                                            <h6 className="fs-16 fw-medium"><a href="flight-details.html">Cloudrider 789</a></h6>
                                        </div>
                                        <div className="text-end">
                                            <p className="fs-14 mb-1">Amount</p>
                                            <h6 className="fw-medium">$569</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-none mb-4">
                                <div className="card-body p-2">
                                    <div className="d-flex justify-content-between align-items-center flex-fill">
                                        <div>
                                            <div className="d-flex align-items-center flex-wrap mb-1">
                                                <a href="invoices.html" className="fs-14 link-primary border-end pe-2 me-2 mb-0">#INV12564</a>
                                                <p className="fs-14">Date: 13 May 2024</p>
                                            </div>
                                            <h6 className="fs-16 fw-medium"><a href="hotel-details.html">The Luxe Haven</a></h6>
                                        </div>
                                        <div className="text-end">
                                            <p className="fs-14 mb-1">Amount</p>
                                            <h6 className="fw-medium">$430</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-none mb-4">
                                <div className="card-body p-2">
                                    <div className="d-flex justify-content-between align-items-center flex-fill">
                                        <div>
                                            <div className="d-flex align-items-center flex-wrap mb-1">
                                                <a href="invoices.html" className="fs-14 link-primary border-end pe-2 me-2 mb-0">#INV12563</a>
                                                <p className="fs-14">Date: 10 May 2024</p>
                                            </div>
                                            <h6 className="fs-16 fw-medium"><a href="car-details.html">Ford Mustang 4.0 AT</a></h6>
                                        </div>
                                        <div className="text-end">
                                            <p className="fs-14 mb-1">Amount</p>
                                            <h6 className="fw-medium">$380</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-none mb-0">
                                <div className="card-body p-2">
                                    <div className="d-flex justify-content-between align-items-center flex-fill">
                                        <div>
                                            <h6 className="fs-16 fw-medium mb-1"><a href="cruise-details.html">Super Aquamarine</a></h6>
                                            <div className="d-flex align-items-center flex-wrap">
                                                <a href="invoices.html" className="fs-14 link-primary border-end pe-2 me-2 mb-0">#INV12562</a>
                                                <p className="fs-14">Date: 04 May 2024</p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <p className="fs-14 mb-1">Amount</p>
                                            <h6 className="fw-medium">$475</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /Recent Invoices --> */}

            </div>

            {/* <!-- Add Lists --> */}
            {/* <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <div className="col">
                    <div className="card bg-success-100 border-0 shadow-none">
                        <div className="card-body">
                            <h6 className="mb-1">4 Hotels</h6>
                            <a href="add-hotel.html" className="fs-14 fw-medium link-default text-decoration-underline">Add New Hotels</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-pink-100 border-0 shadow-none">
                        <div className="card-body">
                            <h6 className="mb-1">4 Flights</h6>
                            <a href="add-flight.html" className="fs-14 fw-medium link-primary text-decoration-underline">Add New Flight</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-danger-100 border-0 shadow-none">
                        <div className="card-body">
                            <h6 className="mb-1">5 Tours</h6>
                            <a href="add-tour.html" className="fs-14 fw-medium link-default text-decoration-underline">Add New Tour</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-purple-100 border-0 shadow-none">
                        <div className="card-body">
                            <h6 className="mb-1">9 Cars</h6>
                            <a href="add-car.html" className="fs-14 fw-medium link-default text-decoration-underline">Add New Car</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-cyan-100 border-0 shadow-none">
                        <div className="card-body">
                            <h6 className="mb-1">8 Cruise</h6>
                            <a href="add-cruise.html" className="fs-14 fw-medium link-default text-decoration-underline">Add New Cruise</a>
                        </div>
                    </div>
                </div>

            </div> */}
            {/* <!-- /Add Lists --> */}

            {/* <!-- Hotel-Booking List --> */}
            <div className="card hotel-list mb-0">
                <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="">Recent Bookings</h6>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="dropdown me-3">
                                <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hotels
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
                            <div className="input-icon-start position-relative">
                                <span className="icon-addon">
                                    <i className="isax isax-search-normal-1 fs-14"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="Search" />
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
                                        <div className="d-flex align-items-center">
                                            <a href="hotel-details.html" className="avatar avatar-lg"><img src="assets/img/hotels/hotel-01.jpg" className="img-fluid rounded-circle" alt="img" /></a>
                                            <div className="ms-2">
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Athenee</a></p>
                                                <span className="fs-14 fw-normal text-gray-6">Barcelona</span>
                                            </div>
                                        </div>
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
                                        <div className="d-flex align-items-center">
                                            <a href="hotel-details.html" className="avatar avatar-lg"><img src="assets/img/hotels/hotel-18.jpg" className="img-fluid rounded-circle" alt="img" /></a>
                                            <div className="ms-2">
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Luxe Haven</a></p>
                                                <span className="fs-14 fw-normal text-gray-6">London</span>
                                            </div>
                                        </div>
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
                                        <div className="d-flex align-items-center">
                                            <a href="hotel-details.html" className="avatar avatar-lg"><img src="assets/img/hotels/hotel-19.jpg" className="img-fluid rounded-circle" alt="img" /></a>
                                            <div className="ms-2">
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Urban Retreat</a></p>
                                                <span className="fs-14 fw-normal text-gray-6">Edinburgh</span>
                                            </div>
                                        </div>
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
                                    <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#cancelled">#HB-3654</a></td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <a href="hotel-details.html" className="avatar avatar-lg"><img src="assets/img/hotels/hotel-22.jpg" className="img-fluid rounded-circle" alt="img" /></a>
                                            <div className="ms-2">
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">Hotel Evergreen</a></p>
                                                <span className="fs-14 fw-normal text-gray-6">Las Vegas</span>
                                            </div>
                                        </div>
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
                                    <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#pending">#HB-6545</a></td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <a href="hotel-details.html" className="avatar avatar-lg"><img src="assets/img/hotels/hotel-20.jpg" className="img-fluid rounded-circle" alt="img" /></a>
                                            <div className="ms-2">
                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="hotel-details.html">The Grand Horizon</a></p>
                                                <span className="fs-14 fw-normal text-gray-6">Manchester</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 className="fs-14 mb-1">Balcony View</h6>
                                        <span className="fs-14 fw-normal text-gray-6">3 Adults, 2 Child</span>
                                    </td>
                                    <td>5 Days, 4 Nights</td>
                                    <td>$14,840</td>
                                    <td>17 Jun 2025</td>
                                    <td>
                                        <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Pending</span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#pending"><i className="isax isax-eye"></i></a>
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
            <div className="modal fade" id="upcoming" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Booking Info <span className="fs-14 fw-medium text-primary">#HB-1245</span></h5>
                            <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                        </div>
                        <div className="modal-body">
                            <div className="upcoming-content">
                                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="me-2">
                                            <img src="assets/img/hotels/hotel-13.jpg" alt="image" className="avatar avartar-md avatar-rounded" />
                                        </div>
                                        <div>
                                            <h6 className="mb-1">The Luxe Haven</h6>
                                            <div className="title-list">
                                                <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal"><i className="isax isax-building me-2"></i>Luxury Hotel</p>
                                                <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal"><i className="isax isax-location5 me-2"></i>15/C Prince Dareen Road, New York</p>
                                                <p className="d-flex align-items-center pe-2 me-2  fw-normal"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>(400 Reviews)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Room Details</h6>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Room Type</h6>
                                            <p className="text-gray-6 fs-16 ">Queen Room</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">No of Rooms</h6>
                                            <p className="text-gray-6 fs-16 ">1</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Room Price</h6>
                                            <p className="text-gray-6 fs-16 ">$400</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Guests</h6>
                                            <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Booking Info</h6>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Booked On</h6>
                                            <p className="text-gray-6 fs-16 ">15 May 2024</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Check In Date & Time</h6>
                                            <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Checkout Date & Time</h6>
                                            <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">No of Days Stay</h6>
                                            <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Extra Service Info</h6>
                                    <div className="d-flex align-items-center">
                                        <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Cleaning</span>
                                        <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Airport Pickup</span>
                                        <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14">Breakfast</span>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Billing Info</h6>
                                    <div className="row gy-3">
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Name</h6>
                                            <p className="text-gray-6 fs-16 ">Chris Foxy</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Email</h6>
                                            <p className="text-gray-6 fs-16 "><a href="https://dreamstour.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="93f0fbe1f5fca1a0a6a5d3f6ebf2fee3fff6bdf0fcfe">[email&#160;protected]</a></p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Phone</h6>
                                            <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Address</h6>
                                            <p className="text-gray-6 fs-16 ">15/C Prince Dareen Road, New York</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Order Info</h6>
                                    <div className="row gy-3">
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Order Id</h6>
                                            <p className="text-primary fs-16 ">#45669</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Payment Method</h6>
                                            <p className="text-gray-6 fs-16 ">Credit Card (Visa)</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Payment Status</h6>
                                            <p className="text-success fs-16 ">Paid</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Date of Payment</h6>
                                            <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Tax</h6>
                                            <p className="text-gray-6 fs-16 ">15% ($60)</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Discount</h6>
                                            <p className="text-gray-6 fs-16 ">20% ($15)</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Booking Fees</h6>
                                            <p className="text-gray-6 fs-16 ">$25</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h6 className="fs-14">Total Paid</h6>
                                            <p className="text-gray-6 fs-16 ">$6569</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-toggle="modal" data-bs-target="#cancel-booking">Cancel Booking</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OpeDashCom;