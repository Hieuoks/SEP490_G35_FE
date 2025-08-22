import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TourDetailSlider from '../components/TourOpDetailSlider';
import TourDetailSidebar from '../components/TourOpDetailSideBar';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import { getTourOpDetail } from '../services/tourOperatorService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getTourByOperatorId } from '../services/tourService';
import Cookies from 'js-cookie';

const TourDetailPage = () => {
  const { id } = useParams();
  const [tourDetail, setTourDetail] = useState(null);
  const [tourList, setTourList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Thêm state cho slider tour
  const [tourIndex, setTourIndex] = useState(0);
  const TOURS_PER_PAGE = 3;

  // Lấy operatorId từ cookies
  const operatorId = Cookies.get('operatorId');

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const data = await getTourOpDetail(id);
        setTourDetail(data);
      } catch (error) {
        console.error('Lỗi khi lấy tour detail:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTourDetailForOperator = async () => {
      try {
        const res = await getTourByOperatorId(id);
        setTourList(res.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy tour list:', error);
      }
    };

    if (id) {
      fetchTourDetail();
      fetchTourDetailForOperator();
    }
  }, [id]);

  // Xử lý chuyển trang
  const handlePrev = () => {
    setTourIndex((prev) =>
      prev - TOURS_PER_PAGE < 0
        ? Math.max(tourList.length - (tourList.length % TOURS_PER_PAGE || TOURS_PER_PAGE), 0)
        : prev - TOURS_PER_PAGE
    );
  };

  const handleNext = () => {
    setTourIndex((prev) =>
      prev + TOURS_PER_PAGE >= tourList.length ? 0 : prev + TOURS_PER_PAGE
    );
  };

  if (loading) return <div className="text-center py-5">Đang tải...</div>;
  if (!tourDetail) return <div className="text-center py-5">Không tìm thấy tour</div>;

  // Lấy danh sách tour hiện tại để hiển thị
  const currentTours = tourList.slice(tourIndex, tourIndex + TOURS_PER_PAGE).length === TOURS_PER_PAGE
    ? tourList.slice(tourIndex, tourIndex + TOURS_PER_PAGE)
    : [...tourList.slice(tourIndex), ...tourList.slice(0, TOURS_PER_PAGE - (tourList.length - tourIndex))];

  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Nhà Điều Hành</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="fas fa-home"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Chi tiết nhà điều hành</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content py-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <TourDetailSlider tour={tourDetail} />
            </div>
            <div className="col-xl-4">
              <TourDetailSidebar tour={tourDetail} />
              {/* Nút chỉnh sửa nếu đúng operatorId */}
              {operatorId && operatorId === id && (
                <div className="mt-3">
                  <a
                    href={`/tour-operator/update/${operatorId}`}
                    className="btn btn-warning w-100"
                  >
                    Chỉnh sửa nhà điều hành
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách tour của nhà điều hành */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Các tour của nhà điều hành</h4>
          {tourList.length > 0 && (
            <div>
              <button className="btn btn-outline-primary me-2" onClick={handlePrev}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="btn btn-outline-primary" onClick={handleNext}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
        <div className="row">
          {tourList.length === 0 ? (
            <div className="col-12 text-center text-muted py-5">
              Nhà điều hành này không có tour nào.
            </div>
          ) : (
            currentTours.map((tour) => (
              <div className="col-md-4 mb-4" key={tour.tourId}>
                <div className="card h-100">
                  <img
                    src={tour.tourAvartar}
                    className="card-img-top"
                    alt={tour.title}
                    style={{ height: 180, objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{tour.title}</h5>
                    <p className="card-text text-truncate">{tour.description}</p>
                    <div className="mb-2">
                      <span className="badge bg-primary me-2">Giá: {tour.priceOfAdults}₫</span>
                      <span className="badge bg-secondary">Thời lượng: {tour.durationInDays} ngày</span>
                    </div>
                    <div className="mt-auto">
                      <a href={`/tour/detail/${tour.tourId}`} className="btn btn-sm btn-outline-primary w-100">
                        Xem chi tiết
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TourDetailPage;