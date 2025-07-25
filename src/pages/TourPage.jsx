// TourPage.jsx
import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import TourCard from '../components/TourCard';
import { filterTour } from '../services/tourService';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
const TourPage = () => {
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    transportation: '',
    startPoint: '',
    minPrice: 0,
    maxPrice: 999999,
    page: 1,
    pageSize: 6,
  });

  const [tourList, setTourList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const fetchTours = async () => {
    try {
      const res = await filterTour(
        filters.title,
        filters.type,
        filters.transportation,
        filters.startPoint,
        filters.minPrice,
        filters.maxPrice,
        filters.page,
        filters.pageSize
      );
      setTourList(res.data);
      setTotalRecords(res.totalRecords);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [filters]);

  return (
    <><HeaderTopbar />
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
          <div className="row">
            {tourList.map((tour) => (
              <div className="col-xxl-4 col-md-6 d-flex" key={tour.tourId}>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TourPage;
