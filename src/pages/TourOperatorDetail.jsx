import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TourDetailSlider from '../components/TourOpDetailSlider';
import TourDetailSidebar from '../components/TourOpDetailSideBar';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import { getTourOpDetail } from '../services/tourOperatorService'; // API giả định
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const TourDetailPage = () => {
  const { id } = useParams();
  const [tourDetail, setTourDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const data = await getTourOpDetail(id); // API call lấy chi tiết từ id
        setTourDetail(data);
      } catch (error) {
        console.error('Lỗi khi lấy tour detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetail();
    }
  }, [id]);

  if (loading) return <div className="text-center py-5">Đang tải...</div>;
  if (!tourDetail) return <div className="text-center py-5">Không tìm thấy tour</div>;

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
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default TourDetailPage;
