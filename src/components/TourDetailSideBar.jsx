import React, { useState,useEffect } from "react";
import { createBooking } from "../services/bookingService";
import { toast } from "react-toastify";
import {
  faTicketAlt,
  faReceipt,
  faMapMarkerAlt,
  faHeart,
  faShareAlt,
  faPhoneAlt,
  faUsers,
  faPlane,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function TourSidebar({ tour }) {
  const [adults, setAdults] = useState(0);
  const [infants, setInfants] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    tour?.departureDates?.[0]?.departureDate1 || ""
  );
  const [departureId, setDepartureID]=useState(tour?.departureDates?.[0]?.id)
const [note, setNote] = useState("");
const [contract, setContract] = useState("");
 

  useEffect(() => {
    if (tour && tour.departureDates?.length > 0) {
      const firstDeparture = tour.departureDates[0];
      setSelectedDate(firstDeparture.departureDate1 || "");
      setDepartureID(firstDeparture.id || null);
    }

    
  }, [tour]);

  


  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) =>
    setter(value > 1 ? value - 1 : 1);

  const formattedDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedDateObj = tour?.departureDates.find(
    (d) => d.departureDate1 === selectedDate
  );

  const payload = {
    tourId: tour?.tourId,
    departureDateId: departureId ,
    numberOfAdults: adults,
    numberOfChildren: children,
    numberOfInfants: infants,
    noteForTour: note,
    contract: contract,
  };
console.log("Booking payload:", payload);
  try {
    const res = await createBooking(payload);
    toast.success("Đặt tour thành công!");
  } catch (err) {
    toast.error("Có lỗi khi đặt tour");
  }
};

  return (
    <div className="col-xl-4 theiaStickySidebar">
      {/* Tour Details */}
      <div className="card bg-light-200">
        <div className="card-body">
          <h5 className="d-flex align-items-center fs-18 mb-3">
            <span className="avatar avatar-md rounded-circle bg-primary me-2">
              <i className="fa-solid fa-signs-post"></i>
            </span>
            Thông tin tour
          </h5>
         <div className="bg-light rounded p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <strong>Tên tour:</strong> {tour?.title}
          </div>
          <div className="col-md-6">
            <strong>Thời lượng:</strong>{' '}
            <FontAwesomeIcon icon={faClock} className="me-1" />
            {tour?.durationInDays} ngày
          </div>
          <div className="col-md-6">
            <strong>Phương tiện:</strong>{' '}
            <FontAwesomeIcon icon={faPlane} className="me-1" />
            {tour?.transportation}
          </div>
          <div className="col-md-6">
            <strong>Điểm khởi hành:</strong> {tour?.startPoint}
          </div>
          <div className="col-md-6">
            <strong>Giá người lớn:</strong> {tour?.priceOfAdults} VND
          </div>
          <div className="col-md-6">
            <strong>Giá trẻ em:</strong> {tour?.priceOfChildren} VND
          </div>
          <div className="col-md-6">
            <strong>Giá trẻ sơ sinh:</strong> {tour?.priceOfInfants} VND
          </div>
          <div className="col-md-6">
            <strong>Đánh giá trung bình:</strong> {tour?.averageRating}/5
          </div>
          <div className="col-md-6">
            <strong>Số chỗ đã đặt:</strong>{' '}
            <FontAwesomeIcon icon={faUsers} className="me-1" />
            {tour?.slotsBooked}/{tour?.maxSlots}
          </div>
        </div>
      </div>

        </div>
      </div>

      {/* Booking Card */}
      <div className="card shadow-none">
  <div className="card-body">
    
    <h5 className="fs-18 mb-3">Đặt tour</h5>
    <div className="banner-form">
      <form onSubmit={handleSubmit}>
        <div className="form-info border-0">
          <div className="form-item border rounded p-3 mb-3 w-100">
            <label className="form-label fs-14 text-default mb-1">
              Ngày khởi hành
            </label>
            <select
              className="form-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {tour?.departureDates?.length > 0 ? (
                tour.departureDates.map((d, idx) => (
                  <option key={idx} value={d.departureDate1} onClick={() => setDepartureID(d.id)}>
                    {formattedDate(d.departureDate1)}
                  </option>
                ))
              ) : (
                <option disabled>Không có ngày khởi hành</option>
              )}
            </select>
          </div>

          <div className="card shadow-none mb-3">
            <div className="card-body p-3 pb-0">
              <div className="border-bottom pb-2 mb-2">
                <h6>Số lượng khách</h6>
              </div>

              {[
                { label: "Người lớn", state: adults, set: setAdults },
                { label: "Trẻ sơ sinh", state: infants, set: setInfants },
                { label: "Trẻ em", state: children, set: setChildren },
              ].map(({ label, state, set }) => (
                <div
                  key={label}
                  className="mb-3 d-flex align-items-center justify-content-between"
                >
                  <label className="form-label text-gray-9 mb-0">
                    {label}
                  </label>
                  <div className="input-group" style={{ width: "130px" }}>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleDecrement(set, state)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={state.toString().padStart(2, "0")}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleIncrement(set, state)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="mb-3">
            <label className="form-label">Ghi chú</label>
            <textarea
              className="form-control"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú cho tour (nếu có)..."
            />
          </div>

         
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Đặt ngay
        </button>
      </form>
    </div>
  </div>
</div>


      {/* Provider Details */}
      <div className="card shadow-none mb-0">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Thông tin nhà cung cấp</h5>
          <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
            <div className="avatar avatar-lg flex-shrink-0 me-2">
              <img
                src={tour?.companyLogo || "assets/img/users/user-05.jpg"}
                alt="Company Logo"
                className="rounded-circle"
                style={{ width: 64, height: 64, objectFit: "cover" }}
              />
            </div>
            <div className="ms-2 overflow-hidden">
              <h6 className="fw-medium text-truncate">
                {tour?.companyName || "Không rõ"}
              </h6>
              <p className="fs-14 mb-0">
                Tham gia từ:{" "}
                {tour?.createdAt
                  ? formattedDate(tour.createdAt)
                  : "Không rõ"}
              </p>
            </div>
          </div>

          <div className="border br-10 mb-3 p-3">
            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
              <span className="avatar avatar-sm me-2 rounded-circle bg-primary">
                <i className="fa-solid fa-phone"></i>
              </span>
              <p className="mb-0">Hotline: {tour?.companyHotline || "N/A"}</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="avatar avatar-sm me-2 rounded-circle bg-primary">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <p className="mb-0">
                Email:{" "}
                <a href={`mailto:${tour?.companyEmail || ""}`}>
                  {tour?.companyEmail || "N/A"}
                </a>
              </p>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-sm-6">
              <a
                href="#"
                className="btn btn-light d-flex align-items-center justify-content-center"
              >
                <i className="fa-brands fa-whatsapp me-2"></i>Liên hệ Zalo
              </a>
            </div>
            <div className="col-sm-6">
              <a
                href="chat.html"
                className="btn btn-primary d-flex align-items-center justify-content-center"
              >
                <i className="fa-solid fa-comments me-2"></i>Chat ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourSidebar;
