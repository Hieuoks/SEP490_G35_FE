import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { getBookingCustomer, cancelBooking } from "../services/bookingService";
import CustomerSidebar from "../components/CustomerSideBar";

const BookingList = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getBookingCustomer();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Hủy booking thành công!");
      await fetchBookings(); // Lấy lại danh sách booking sau khi hủy
    } catch (error) {
      console.error("Cancel booking failed:", error);
      toast.error("Hủy booking thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <CustomerSidebar />
        </div>
        <div className="col-md-9">
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
                  <strong>{booking.tour?.title}</strong> -{" "}
                  <span className="badge bg-warning text-dark">
                    {booking.paymentInfo?.bookingStatus}
                  </span>
                </div>
                {expandedId === booking.bookingId ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {expandedId === booking.bookingId && (
                <div className="card-body">
                  <p>
                    <FaUser className="me-2" />
                    <strong>Người đặt:</strong> {booking.billingInfo?.username}
                  </p>
                  <p>
                    <FaCalendarAlt className="me-2" />
                    <strong>Ngày đặt:</strong>{" "}
                    {booking.booking?.bookingDate ? new Date(booking.booking.bookingDate).toLocaleString() : ""}
                  </p>
                  <p>
                    <FaMoneyBillWave className="me-2" />
                    <strong>Tổng giá:</strong>{" "}
                    {booking.paymentInfo?.totalPrice?.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Người lớn:</strong> {booking.guest?.numberOfAdults} |{" "}
                    <strong>Trẻ em:</strong> {booking.guest?.numberOfChildren} |{" "}
                    <strong>Trẻ sơ sinh:</strong> {booking.guest?.numberOfInfants}
                  </p>
                  <p>
                    <strong>Tour:</strong> {booking.tour?.title} <br />
                    <strong>Khởi hành:</strong>{" "}
                    {booking.tour?.departureDate
                      ? new Date(booking.tour.departureDate).toLocaleDateString()
                      : ""}
                    <br />
                    <strong>Điểm xuất phát:</strong> {booking.tour?.startPoint}
                    <br />
                    <strong>Phương tiện:</strong> {booking.tour?.transportation}
                    <br />
                    <strong>Thời lượng:</strong> {booking.tour?.durationInDays} ngày
                  </p>
                  <p>
                    <strong>Ghi chú:</strong> {booking.booking?.noteForTour || "Không có"}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.billingInfo?.email} <br />
                    <strong>Phone:</strong> {booking.billingInfo?.phone} <br />
                    <strong>Địa chỉ:</strong> {booking.billingInfo?.address}
                  </p>
                  <p>
                    <strong>Hạn thanh toán:</strong>{" "}
                    {booking.paymentDeadline ? new Date(booking.paymentDeadline).toLocaleDateString() : "Không có"}
                  </p>
                  <p>
                    <strong>Thanh toán:</strong>{" "}
                    <span className="badge bg-info text-dark">
                      {booking.paymentInfo?.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span className={`badge ${booking.paymentInfo?.bookingStatus === "Pending" ? "bg-secondary" : "bg-success"}`}>
                      {booking.paymentInfo?.bookingStatus}
                    </span>
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(booking.bookingId)}
                    title="Hủy booking này"
                  >
                    Hủy Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingList;