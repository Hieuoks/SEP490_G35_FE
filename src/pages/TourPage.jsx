import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import TourCard from '../components/TourCard';
import { getTour } from '../services/tourService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const TourPage = () => {
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    transportation: '',
    startPoint: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    pageSize: 6,
  });

  const [tourList, setTourList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Lấy tất cả tour
  const fetchTours = async () => {
    try {
      const res = await getTour(1, 1000);
      console.log(res.data); // lấy nhiều để filter phía client
      setTourList(res.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Filter phía client
  useEffect(() => {
    let filtered = tourList.filter(tour => {
      const matchTitle = !filters.title || tour.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchType = !filters.type || tour.type === filters.type;
      const matchTransport = !filters.transportation || tour.transportation === filters.transportation;
      const matchStart = !filters.startPoint || tour.startPoint === filters.startPoint;
      const min = filters.minPrice !== '' ? Number(filters.minPrice) : 0;
      const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : 999999;
      const matchPrice =
  (tour.priceOfAdults >= min && tour.priceOfAdults <= max) ||
  (tour.priceOfChildren >= min && tour.priceOfChildren <= max) ||
  (tour.priceOfInfants >= min && tour.priceOfInfants <= max);
      return matchTitle && matchType && matchTransport && matchStart && matchPrice;
    });
    console.log("Filtered Tours:", filtered);
    setTotalRecords(filtered.length);
    // Phân trang
    const startIdx = (filters.page - 1) * filters.pageSize;
    setFilteredList(filtered.slice(startIdx, startIdx + filters.pageSize));
  }, [tourList, filters]);

  const totalPages = Math.ceil(totalRecords / filters.pageSize);

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Nhận filter từ FilterSidebar
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Gói du lịch</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="home">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Danh sách gói du lịch</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
          <div className="col-xl-9 col-lg-8">
            <h6>{totalRecords} Tours Found</h6>
            <div
              className="d-flex flex-wrap"
              style={{
                gap: "0px",
                marginLeft: "-12px",
                marginRight: "-12px",
              }}
            >
              {filteredList?.map((tour) => (
                <div
                  key={tour.tourId}
                  style={{
                    flex: "0 0 33.3333%",
                    maxWidth: "33.3333%",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                  }}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item${filters.page === 1 ? " disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(filters.page - 1)}>
                      &laquo;
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item${filters.page === i + 1 ? " active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item${filters.page === totalPages ? " disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(filters.page + 1)}>
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TourPage;