import React, { useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';

const TourDetailSlider = ({ tour }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const mediaItems = tour?.tourMedia || [];

  const handleThumbClick = (idx) => setMainIndex(idx);

  return (
    <div>
      {/* Slider ảnh tour */}
      <div className="service-wrap mb-4 d-flex">
        <div className="flex-grow-1 me-3">
          <div className="service-img mb-3">
            <img
              src={mediaItems[mainIndex]?.mediaUrl}
              className="img-fluid rounded w-100"
              alt={mediaItems[mainIndex]?.caption || 'Tour Image'}
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
                  alt={item.caption || 'Tour Thumbnail'}
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
            {tour?.companyName || 'Tên công ty'}
            {tour?.isActive && (
              <span className="badge bg-success rounded-pill ms-2">
                <FontAwesomeIcon icon={faTicketAlt} className="me-1" />
                Verified
              </span>
            )}
          </h4>
          <p className="text-muted mb-2">{tour?.companyDescription}</p>
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
              Hotline: {tour?.companyHotline}
            </p>
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faReceipt} className="text-primary me-2" />
              License No: {tour?.licenseNumber || 'N/A'}
            </p>
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              {tour?.startPoint}
              <a href="#location" className="link-primary text-decoration-underline fw-medium ms-2">
                View Location
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
            className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
          >
            <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
            Save
          </a>
        </div>
      </div>

      {/* Thông tin chi tiết về tour */}
      
      {/* Mô tả tour */}
      

      {/* Ghi chú */}
      <div className="mb-4">
        <h5>Ghi chú:</h5>
        <p>{tour?.note}</p>
      </div>
    </div>
  );
};

export default TourDetailSlider;
