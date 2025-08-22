import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const TourDetailSidebar = ({ tour }) => {
  if (!tour) return null;

  const {
    companyName,
    licenseNumber,
    licenseIssuedDate,
    taxCode,
    establishedYear,
    hotline,
    address,
    workingHours
  } = tour;

  return (
    <div className="w-100">
      <div className="card bg-light-200 mb-4">
        <div className="card-body">
          <h5 className="d-flex align-items-center fs-18 mb-3">
            <span className="avatar avatar-md rounded-circle bg-primary me-2">
              <FontAwesomeIcon icon={faMapSigns} />
            </span>
            Thông tin nhà điều hành
          </h5>
          <div>
            {[
              ['Tên công ty', companyName],
              ['Số giấy phép', licenseNumber],
              ['Ngày cấp phép', licenseIssuedDate ? moment(licenseIssuedDate).format('DD/MM/YYYY') : 'Chưa có'],
              ['Mã số thuế', taxCode],
              ['Năm thành lập', establishedYear],
              ['Hotline', hotline],
              ['Địa chỉ', address],
              ['Giờ làm việc', workingHours]
            ].map(([label, value]) => (
              <div key={label} className="d-flex align-items-center justify-content-between details-info">
                <h6 className="fw-medium mb-0">{label}</h6>
                <p className="flex-fill mb-0 text-end">{value || 'Chưa có'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailSidebar;