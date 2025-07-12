import React, { useEffect, useState } from 'react';
import { getTourOp } from '../services/tourOperatorService';
import { Spin, Select, Empty, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Search } = Input;

const TourGrid = (searchQuery) => {
  const [tourData, setTourData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [addressFilter, setAddressFilter] = useState('');
  const [pageSize, setPageSize] = useState(6);
const navigate = useNavigate();
  const fetchTours = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getTourOp(page, pageSize);
      let tours = data.tourOperators || [];

      // Lọc theo địa chỉ
      if (addressFilter.trim() !== '') {
        tours = tours.filter(tour =>
          tour.address?.toLowerCase().includes(addressFilter.toLowerCase())
        );
      }

      // Sắp xếp theo tên
      tours.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.companyName.localeCompare(b.companyName)
          : b.companyName.localeCompare(a.companyName);
      });

      setTourData(tours);
      setTotalPages(data.totalPages);
      setPageNumber(data.pageNumber);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours(pageNumber);
  }, [pageNumber, sortOrder, addressFilter, pageSize]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
       

        <Select defaultValue="asc" style={{ width: 180 }} onChange={setSortOrder}>
          <Option value="asc">Sắp xếp A-Z</Option>
          <Option value="desc">Sắp xếp Z-A</Option>
        </Select>

        <Select defaultValue={6} style={{ width: 140 }} onChange={(value) => setPageSize(value)}>
          {[1, 2, 4, 6, 8, 10].map(size => (
            <Option key={size} value={size}>{size} / trang</Option>
          ))}
        </Select>
      </div>

      <Spin spinning={loading} tip="Đang tải...">
        <div className="row">
          {tourData.length > 0 ? (
            tourData.map((tour) => (
              <div key={tour.tourOperatorId} className="col-xxl-4 col-md-6 d-flex">
                <div className="place-item mb-4 flex-fill">
                  <div className="place-img">
                    <img
                      src={tour.companyLogo || 'assets/img/tours/tours-07.jpg'}
                      className="img-fluid"
                      alt={tour.companyName}
                    />
                  </div>
                  <div className="place-content">
                    <h5 className="mb-1 text-truncate">
                      <a href={`tour-operator-detail/${tour.tourOperatorId}`}>{tour.companyName}</a>
                    </h5>
                    <p className="fs-14 text-gray-9">{tour.description}</p>
                    <p className="fs-14 text-muted">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                      {tour.address}
                    </p>
                    <p className="fs-14 text-muted">
                      Active: {tour.isActive ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty description="Không có kết quả" className="w-100" />
          )}
        </div>
      </Spin>

      <nav className="pagination-nav mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNumber - 1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1} className={`page-item ${pageNumber === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TourGrid;
