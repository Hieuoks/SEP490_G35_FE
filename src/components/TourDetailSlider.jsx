import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';

const TourDetailSlider = ({ tour }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const mediaItems = tour?.tourMedia || [];
  const navigate = useNavigate();

  const handleThumbClick = (idx) => setMainIndex(idx);

  const handleCompare = () => {
    console.log('So sánh tour:', tour);
    if (tour?.tourId) {
      navigate(`/tour/compare/${tour.tourId}`);
    }
  };

  // Hàm tạo link Google Maps tìm kiếm vị trí
  const getGoogleMapsLink = (location) => {
    if (!location) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

  return (
    <div>
      {/* Slider ảnh tour */}
      <div className="service-wrap mb-4 d-flex">
        <div className="flex-grow-1 me-3">
          <div className="service-img mb-3">
            <img
              src={mediaItems[mainIndex]?.mediaUrl}
              className="img-fluid rounded w-100"
              alt={mediaItems[mainIndex]?.caption || 'Ảnh tour'}
              style={{ objectFit: 'cover', height: '400px' }}
            />
          </div>
        </div>
        <div className="d-flex flex-column" style={{ width: '100px' }}>
          {mediaItems.map((item, idx) =>
            idx !== mainIndex ? (
              <div key={item.id} className="mb-2">
                <img
                  src={item.mediaUrl}
                  className="img-fluid rounded"
                  alt={item.caption || 'Ảnh nhỏ tour'}
                  style={{ height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => handleThumbClick(idx)}
                />
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Thông tin công ty & tour */}
      <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap">
        <div>
          <h4 className="d-flex align-items-center flex-wrap mb-2">
            {tour?.title || 'Tên công ty'}
            {tour?.isActive && (
              <span className="badge bg-success rounded-pill ms-2">
                <FontAwesomeIcon icon={faTicketAlt} className="me-1" />
                Đã xác thực
              </span>
            )}
          </h4>
          
          <div className="d-flex align-items-center flex-wrap">
           
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              <strong>Điểm khởi hành:</strong> {tour?.startPoint}
              <a
                href={getGoogleMapsLink(tour?.startPoint)}
                className="link-primary text-decoration-underline fw-medium ms-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem vị trí
              </a>
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <a
            href="#"
            className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </a>
          <a
            href="#"
            className="btn btn-outline-light btn-sm d-inline-flex align-items-center me-2"
          >
            <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
            Lưu
          </a>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
            onClick={handleCompare}
          >
            <FontAwesomeIcon icon={faBalanceScale} className="me-1" />
            So sánh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetailSlider;