import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const bannerImages = [
  "assets/img/banner/banner-01.jpg",
  "assets/img/banner/banner-02.jpg",
  "assets/img/banner/banner-03.jpg",
  "assets/img/banner/banner-04.jpg",
];

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("tour"); // "tour" hoặc "operator"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      if (searchType === "tour") {
        navigate(`/tour-list?title=${encodeURIComponent(search.trim())}`);
      } else {
        navigate(`/tour-operator?name=${encodeURIComponent(search.trim())}`);
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="banner-slider banner-sec">
        <Carousel>
          {bannerImages.map((img, idx) => (
            <Carousel.Item key={idx}>
              <div className="slider-img">
                <img src={img} alt={`Banner ${idx + 1}`} className="d-block w-100" />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="row align-items-center">
            <div className="col-md-12 mx-auto wow fadeInUp" data-wow-delay="0.3s">
              <div className="banner-content mx-auto">
                <h1 className="text-white display-5 mb-2">
                  Gần hơn với giấc mơ: <span>Tour của bạn</span> đang chờ đón
                </h1>
                <h6 className="text-light mx-auto">
                  Điểm đến lý tưởng để bạn lưu giữ và kỷ niệm những trải nghiệm du lịch tuyệt vời.
                </h6>
              </div>
              <div className="banner-form card mb-0">
                <div className="card-header">
                  <h5 className="mb-0 text-center">Tìm kiếm tour hoặc nhà điều hành</h5>
                </div>
                <div className="card-body">

                  <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-2">
                    <select
                      className="form-select"
                      style={{ maxWidth: 180 }}
                      value={searchType}
                      onChange={e => setSearchType(e.target.value)}
                    >
                      <option value="tour">Tìm tour</option>
                      <option value="operator">Tìm nhà điều hành</option>
                    </select>
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder={searchType === "tour" ? "Nhập tên tour..." : "Nhập tên nhà điều hành..."}

                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ maxWidth: 400 }}
                    />
                    <button type="submit" className="btn btn-primary">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>
              {/* Nếu muốn hiển thị các tab khác, có thể bổ sung ở đây */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;