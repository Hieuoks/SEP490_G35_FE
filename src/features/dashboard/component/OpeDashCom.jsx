import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaListAlt, FaStar } from 'react-icons/fa';
import { getTotalTour, getTotalBooking, getTotalEarnings, getTotalReviews } from '../../../services/dashboardService';
import { useState, useEffect } from 'react';
import {getRecentAddTOur} from '../../../services/tourService';
import { getNotification, marksAllRead, marksRead } from '../../../services/notificationService';
import Cookies from 'js-cookie';
const OpeDashCom = () => {
    const userId = Cookies.get('userId');
    const [notifications, setNotifications] = useState([]);
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
    const fetchNotifications = () => {
        if (userId) {
          getNotification().then((res) => {
            setNotifications(res.notifications.slice(0,5) || []);
            console.log(res)
          });
        }
      };
    
      useEffect(() => {
        fetchNotifications();
        // eslint-disable-next-line
      }, [userId]);
    const handleMarkRead = async (id) => {
        await marksRead(id);
        fetchNotifications();
      };
    
      const handleMarkAllRead = async () => {
        await marksAllRead();
        fetchNotifications();
      };

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
                            <div className="card shadow-none flex-fill">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
                                        <h6>Latest Notification</h6>
                                    </div>
                                    {notifications.map((noti)=>(
                                    <div className="card shadow-none mb-4">
                                        <div className="card-body p-2">
                                            <div className="d-flex justify-content-between align-items-center flex-fill">
                                                <div>
                                                    <div className="d-flex align-items-center flex-wrap mb-1">
                                                        <p className="fs-14">Date: {new Date(noti.createdAt).toLocaleString("en-GB")}</p>
                                                    </div>
                                                    <h6 className="fs-16 fw-medium"><a href="flight-details.html">{noti.title}</a></h6>
                                                    <div className="d-flex align-items-center flex-wrap mb-1">
                                                        <p className="fs-14">{noti.message}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                {/* <!-- /Recent Invoices --> */}

            </div>
            
        </div>
    );
}
export default OpeDashCom;