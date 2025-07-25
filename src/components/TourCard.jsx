import React from "react";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const {
    tourId,
    title,
    price,
    startPoint,
    transportation,
    durationInDays,
    maxSlots,
    slotsBooked,
    companyName,
    companyDescription,
  } = tour;

  const guests = maxSlots;
  const dateDisplay = durationInDays || "Unknown duration";
  const navigate = useNavigate();

  // Xử lý chuyển sang trang chi tiết tour
  const handleDetailClick = (e) => {
    e.preventDefault();
    navigate(`/tour/detail/${tourId}`);
  };

  return (
    <div style={{ width: "100%", padding: 0 }}>
      <div className="place-item mb-4" style={{ width: "100%" }}>
        <div className="place-img">
          <div className="img-slider image-slide owl-carousel nav-center">
            {/* TODO: Replace with real images when available */}
            {["tours-07.jpg"].map((img, i) => (
              <div className="slide-images" key={i}>
                <a href="#" onClick={handleDetailClick}>
                  <img
                    src={`assets/img/tours/${img}`}
                    className="img-fluid"
                    alt="Tour"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="fav-item">
            <a href="#" className="fav-icon selected">
              <i className="fa-solid fa-heart"></i>
            </a>
            <span className="badge bg-info d-inline-flex align-items-center">
              <i className="fa-solid fa-ranking-star me-1"></i>Trending
            </span>
          </div>
        </div>

        <div className="place-content" style={{ width: "100%" }}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <div className="d-flex flex-wrap align-items-center">
              <span className="me-1">
                <i className="fa-solid fa-ticket text-primary"></i>
              </span>
              <p className="fs-14 text-gray-9">{transportation}</p>
            </div>
            <span className="d-inline-block border vertical-splits"></span>
            <div className="d-flex align-items-center flex-wrap">
              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                5.0
              </span>
              <p className="fs-14">(105 Reviews)</p>
            </div>
          </div>

          <h5 className="mb-1 text-truncate">
            <a href="#" onClick={handleDetailClick}>{title}</a>
          </h5>

          <p className="d-flex align-items-center mb-3">
            <i className="fa-solid fa-location-dot me-2"></i>
            {startPoint || "Unknown location"}
          </p>

          <div className="mb-3">
            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
              Starts From
              <span className="ms-1 fs-18 fw-semibold text-primary">
                ${price?.toLocaleString() || 0}
              </span>
            </h6>
          </div>

          <div className="d-flex align-items-center justify-content-between border-top pt-3">
            <div className="d-flex flex-wrap align-items-center me-2">
              <span className="me-1">
                <i className="fa-solid fa-calendar-check text-gray-6"></i>
              </span>
              <p className="fs-14 text-gray-9">{dateDisplay}</p>
            </div>

            <span className="d-inline-block border vertical-splits"></span>

            <div className="ms-2 d-flex align-items-center">
              <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                <i className="fa-solid fa-users me-1"></i>
                {guests} Guests
              </p>
              <a href="#" className="avatar avatar-sm ms-3">
                <img
                  src="assets/img/users/user-08.jpg"
                  className="rounded-circle"
                  alt="Operator"
                  title={companyName}
                  style={{ width: 32, height: 32, objectFit: "cover" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;