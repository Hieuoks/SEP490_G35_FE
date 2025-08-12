import React from "react";
import { FaStar, FaCheckCircle, FaArrowRight, FaPlayCircle } from "react-icons/fa";

export default function AboutAdvantagesSection() {
  return (
    <section className="section adavantages-sec bg-light-200">
      <div className="container">
        <div className="row align-items-center">
          {/* Hình ảnh và đánh giá */}
          <div className="col-lg-5">
            <div>
              <div className="section-right-img-two">
                <img src="assets/img/section-img-02.png" alt="Ảnh" />
                <div className="card review-rate-top border-0 mb-0">
                  <div className="card-body d-flex align-items-center">
                    <div className="avatar-list-stacked avatar-group-md me-2">
                      <span className="avatar avatar-rounded">
                        <img className="border border-white" src="assets/img/users/user-01.jpg" alt="img" />
                      </span>
                      <span className="avatar avatar-rounded">
                        <img className="border border-white" src="assets/img/users/user-04.jpg" alt="img" />
                      </span>
                      <span className="avatar avatar-rounded">
                        <img className="border border-white" src="assets/img/users/user-06.jpg" alt="img" />
                      </span>
                      <span className="avatar avatar-rounded">
                        <img className="border border-white" src="assets/img/users/user-07.jpg" alt="img" />
                      </span>
                    </div>
                    <div>
                      <div className="d-flex align-items-center fs-12">
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning me-1" />
                        <p className="fs-14 text-gray-9 mb-0 ms-2">5.0</p>
                      </div>
                      <p className="fs-14 mb-0">2K+ Đánh giá</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Nội dung giới thiệu */}
          <div className="col-lg-7">
            <div>
              <div className="section-header-six mb-4">
                <span className="badge badge-soft-primary rounded-pill mb-1">
                  Tìm hiểu về chúng tôi
                </span>
                <h2 className="mb-2">
                  Cung cấp dịch vụ & chỗ ở chất lượng cao, giúp chuyến đi liền mạch & thú vị.
                </h2>
                <p>
                  Chúng tôi cung cấp đa dạng các tour, từ xe nhỏ phù hợp đi thành phố, đến SUV rộng rãi cho gia đình và các dòng xe sang cho sự kiện đặc biệt.
                </p>
              </div>
              <div className="row g-2 mb-4">
                <div className="col-md-6">
                  <span className="d-block mb-2">
                    <FaCheckCircle className="text-teal fs-4" />
                  </span>
                  <h6 className="mb-1">Vị trí thuận tiện</h6>
                  <p>Nhiều điểm nhận/trả phù hợp kế hoạch di chuyển của bạn.</p>
                </div>
                <div className="col-md-6">
                  <span className="d-block mb-2">
                    <FaCheckCircle className="text-warning fs-4" />
                  </span>
                  <h6 className="mb-1">Dịch vụ tận tâm</h6>
                  <p>Đội ngũ luôn sẵn sàng hỗ trợ mọi thắc mắc của bạn.</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <a href="about-us.html" className="btn btn-dark me-3">
                  Bắt đầu <FaArrowRight className="ms-2" />
                </a>
                <a
                  data-fancybox=""
                  href="https://youtu.be/NSAOrGb9orM"
                  className="btn btn-white"
                >
                  <FaPlayCircle className="me-2" />
                  Xem video
                </a>
              </div>
              <div className="row g-4">
                <div className="col-md-4 d-flex">
                  <div className="counter-item card shadow-none flex-fill mb-0">
                    <div className="card-body">
                      <h3 className="display-6 text-primary mb-2">
                        <span className="counter text-dark">57</span>+
                      </h3>
                      <p>Điểm đến toàn cầu</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="counter-item card shadow-none flex-fill mb-0">
                    <div className="card-body">
                      <h3 className="display-6 text-primary mb-2">
                        <span className="counter text-dark">7098</span>+
                      </h3>
                      <p>Đơn đặt tour thành công</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="counter-item card shadow-none flex-fill mb-0">
                    <div className="card-body">
                      <h3 className="display-6 text-primary mb-2">
                        <span className="counter text-dark">67</span>+
                      </h3>
                      <p>Khách hàng toàn cầu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Nội dung */}
        </div>
      </div>
    </section>
  );
}