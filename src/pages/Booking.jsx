import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa"; // Font Awesome
import { getBookingCustomer } from "../services/bookingService";
const BookingList = () => {
  const [expandedId, setExpandedId] = useState(null);
const [bookings, setBookings] = useState([]);
useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingCustomer();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []); // Chỉ chạy một lần khi component mount

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Danh sách Booking</h4>
      {bookings.map((booking) => (
        <div
          key={booking.bookingId}
          className="card mb-3 shadow-sm"
          style={{ borderRadius: "10px" }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center bg-light"
            onClick={() => toggleExpand(booking.bookingId)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <strong>{booking.tourTitle}</strong> -{" "}
              <span className="badge bg-warning text-dark">
                {booking.bookingStatus}
              </span>
            </div>
            {expandedId === booking.bookingId ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {expandedId === booking.bookingId && (
            <div className="card-body">
              <p>
                <FaUser className="me-2" />
                <strong>Người đặt:</strong> {booking.userName}
              </p>
              <p>
                <FaCalendarAlt className="me-2" />
                <strong>Ngày đặt:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleString()}
              </p>
              <p>
                <FaMoneyBillWave className="me-2" />
                <strong>Tổng giá:</strong> {booking.totalPrice.toLocaleString()} VND
              </p>
              <p>
                <strong>Người lớn:</strong> {booking.numberOfAdults} |{" "}
                <strong>Trẻ em:</strong> {booking.numberOfChildren} |{" "}
                <strong>Trẻ sơ sinh:</strong> {booking.numberOfInfants}
              </p>
              <p>
                <strong>Tour:</strong> {booking.tourTitle} <br />
                <strong>Công ty:</strong> {booking.companyName}
              </p>
              <p>
                <strong>Ghi chú:</strong> {booking.noteForTour || "Không có"}
              </p>
              <p>
                <strong>Thanh toán:</strong>{" "}
                <span className="badge bg-info text-dark">
                  {booking.paymentStatus}
                </span>
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={`badge ${booking.isActive ? "bg-success" : "bg-secondary"}`}>
                  {booking.isActive ? "Hoạt động" : "Không hoạt động"}
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
