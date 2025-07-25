import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faTicketAlt,
  faReceipt,
  faMapMarkerAlt,
  faStar,
  faHeart,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';

const TourDetailSlider = ({ tour }) => {
  const [showMore, setShowMore] = useState(false);
const mediaItems = tour?.media || [];
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div>
      <div className="service-wrap mb-4 d-flex">
      {/* Ảnh lớn chỉ hiện 1 ảnh tại 1 thời điểm */}
      <div className="flex-grow-1 me-3">
        <div className="service-img mb-3">
          <img
            src={mediaItems[0].mediaUrl}
            className="img-fluid rounded w-100"
            alt={mediaItems[0].caption || 'Tour Image'}
            style={{ objectFit: 'cover', height: '400px' }}
          />
        </div>
      </div>

      {/* Thumbnail nhỏ bên phải */}
      <div className="d-flex flex-column" style={{ width: '100px' }}>
        {mediaItems.slice(1).map((item) => (
          <div key={item.id} className="mb-2">
            <img
              src={item.mediaUrl}
              className="img-fluid rounded"
              alt={item.caption || 'Tour Thumbnail'}
              style={{ height: '80px', objectFit: 'cover', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>

      {/* Tour Header Info */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="mb-2">
          <h4 className="mb-1 d-flex align-items-center flex-wrap mb-2">
            {tour?.companyName || 'Tên công ty'}
            {tour?.isActive && (
              <span className="badge badge-xs bg-success rounded-pill ms-2">
                <FontAwesomeIcon icon={faTicketAlt} className="me-1" />
                Verified
              </span>
            )}
          </h4>
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faReceipt} className="text-primary me-2" />
              License No: {tour?.licenseNumber}
            </p>
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              {tour?.address}
              <a
                href="#location"
                className="link-primary text-decoration-underline fw-medium ms-2"
              >
                View Location
              </a>
            </p>
           
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <a
            href="javascript:void(0);"
            className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </a>
          <a
            href="javascript:void(0);"
            className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
          >
            <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
            Save
          </a>
        </div>
      </div>

      {/* Description */}
      <div className="bg-light-200 card-bg-light mb-4">
        <h5 className="fs-18 mb-3">Description</h5>
        <div className="mb-2">
          <p>{tour?.description || 'No description available.'}</p>
        </div>
        {showMore && (
          <div className="more-text">
            <p>
              Website: {tour?.website || 'Chưa có'} <br />
              Facebook: {tour?.facebook || 'Chưa có'} <br />
              Instagram: {tour?.instagram || 'Chưa có'} <br />
              Hotline: {tour?.hotline || 'Chưa có'} <br />
              Giờ làm việc: {tour?.workingHours || 'N/A'}
            </p>
          </div>
        )}
        <a
          href="javascript:void(0);"
          className="fs-14 fw-medium more-link text-decoration-underline mb-2"
          onClick={toggleShowMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </a>
      </div>
    </div>
  );
};

export default TourDetailSlider;
