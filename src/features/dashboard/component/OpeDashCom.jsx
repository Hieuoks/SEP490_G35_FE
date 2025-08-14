import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaListAlt, FaStar } from 'react-icons/fa';
import { getTotalTour, getTotalBooking, getTotalEarnings, getTotalReviews } from '../../../services/dashboardService';
import { useState, useEffect } from 'react';
import {getRecentAddTOur} from '../../../services/tourService';
const OpeDashCom = () => {
    const [totalTour, setTotalTour] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [tours,setTour] = useState([]);
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
        const fetchTour = async () => {
            try {
                const response = await getRecentAddTOur();
                const sorted = [...response].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA; // Giảm dần (mới nhất trước)
                });
                const earliestFiveTours = sorted.slice(0, 5);
                setTour(earliestFiveTours);
                console.log("API response:", response);
            } catch (error) {
                console.error("Error fetching tours:", error);
            } 
        };
        fetchTour();
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
                <div className="col-xl-6 col-xxl-5 d-flex">
                    <div className="card shadow-none flex-fill">
                        <div className="card-body">
                            <h6 className="mb-4">Recently Added</h6>
                            {tours.map((tour) =>(
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <a href={`/tour/detail/${tour.tourId}`} className="avatar avatar-lg flex-shrink-0 me-2">
                                        <img src={tour.tourAvartar || `https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg`} className="img-fluid rounded-circle" alt="Img" />
                                    </a>
                                    <div>
                                        <h6 className="fs-16"><a href= {`/tour/detail/${tour.tourId}`}>{tour.title}</a> <span className="badge badge-soft-info badge-xs rounded-pill"><i className="isax isax-signpost me-1"></i>Tour</span></h6>
                                        <p className="fs-14">Create at : {new Date(tour.createdAt).toLocaleString("en-GB")}</p>
                                    </div>
                                </div>
                                {/* <a href="agent-hotel-booking.html" className="btn rebook-btn btn-sm">06 Bookings</a> */}
                            </div>
                            
                            ))}
                        </div>
                    </div>
                </div>
                {/* <!-- Recent Invoices --> */}
                <div className="col-xxl-7 col-xl-6 d-flex">
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
                </div>
                {/* <!-- /Recent Invoices --> */}

            </div>
            
        </div>
    );
}
export default OpeDashCom;