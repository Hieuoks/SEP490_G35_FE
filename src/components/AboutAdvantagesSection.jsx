import React from "react";

const AboutSection = () => (
  <section className="section about-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about-image mb-4 mb-lg-0">
            <div className="about-listing">
              <i className="fa-solid fa-calendar-plus text-white mb-2" style={{ fontSize: 28 }}></i>
              <h6 className="fs-16 mb-3 text-white">Tất cả điểm đến</h6>
              <div className="listing-img">
                <div>
                  <img src="assets/img/icons/listing.svg" alt="icon" />
                </div>
                <a href="add-hotel.html" className="btn btn-warning text-gray-9">
                  Thêm địa điểm của bạn
                </a>
              </div>
            </div>
            <div className="about-img">
              <img src="assets/img/about.png" alt="about" />
            </div>
            <div className="about-progress d-inline-flex align-items-center">
              <img src="assets/img/icons/progress-icon.svg" alt="icon" />
              <div className="ms-2">
                <p className="fs-10 mb-1">Doanh thu hôm nay</p>
                <h6 className="fs-13">58.000.000₫</h6>
              </div>
              <a href="wallet.html" className="btn btn-teal btn-sm fw-normal ms-4">
                Rút tiền
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-content">
            <h6 className="text-primary fs-14 fw-medium mb-2">Về DreamsTour</h6>
            <h2 className="display-6 mb-2">
              Khám phá Việt Nam: Trải nghiệm du lịch độc đáo cùng DreamsTour
            </h2>
            <p className="mb-4">
              Chúng tôi tự hào mang đến dịch vụ cá nhân hóa cho khách hàng, cam kết tạo nên những hành trình khám phá Việt Nam độc đáo và khó quên.
            </p>
            <div className="d-flex align-items-center mb-4">
              <span className="avatar avatar-xl bg-primary rounded-circle flex-shrink-0 me-3">
                <i className="fa-solid fa-map-location-dot fs-24"></i>
              </span>
              <p>
                Khách hàng có thể lựa chọn các hành trình du lịch, nghỉ dưỡng, khám phá văn hóa và ẩm thực tại mọi miền đất nước Việt Nam.
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="avatar avatar-xl bg-secondary rounded-circle flex-shrink-0 me-3">
                <i className="fa-solid fa-briefcase fs-24 text-gray-9"></i>
              </span>
              <p>
                Cung cấp đa dạng dịch vụ: đặt tour, khách sạn, tư vấn lịch trình, hỗ trợ trải nghiệm địa phương.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center flex-wrap about-btn gap-2">
            <a href="about-us.html" className="btn btn-white d-flex align-items-center">
              Tìm hiểu thêm
              <i className="fa-solid fa-circle-info ms-2"></i>
            </a>
            <div className="avatar-list-stacked avatar-group-md me-2">
              <span className="avatar avatar-rounded">
                <img className="border border-white" src="assets/img/users/user-01.jpg" alt="img" />
              </span>
              <span className="avatar avatar-rounded">
                <img className="border border-white" src="assets/img/users/user-04.jpg" alt="img" />
              </span>
              <span className="avatar avatar-rounded">
                <img src="assets/img/users/user-05.jpg" alt="img" />
              </span>
              <span className="avatar avatar-rounded">
                <img src="assets/img/users/user-06.jpg" alt="img" />
              </span>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1"></i>
                  <i className="fa-solid fa-star filled me-1"></i>
                  <i className="fa-solid fa-star filled me-1"></i>
                  <i className="fa-solid fa-star filled me-1"></i>
                  <i className="fa-solid fa-star filled me-1"></i>
                  <span className="text-gray-9 fs-14">5.0</span>
                </div>
              </div>
              <p className="fs-14">2.000+ đánh giá</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="counter-wrap">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="counter-item mb-4">
                  <h6 className="mb-1 d-flex align-items-center justify-content-center text-teal">
                    <i className="fa-solid fa-earth-asia me-2"></i>
                    Điểm đến trong nước
                  </h6>
                  <h3 className="display-6">
                    <span className="counter">50</span>+
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item mb-4">
                  <h6 className="mb-1 d-flex align-items-center justify-content-center text-purple">
                    <i className="fa-solid fa-calendar-check me-2"></i>
                    Đơn đặt tour thành công
                  </h6>
                  <h3 className="display-6">
                    <span className="counter">7000</span>+
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item mb-4">
                  <h6 className="mb-1 d-flex align-items-center justify-content-center text-pink">
                    <i className="fa-solid fa-users me-2"></i>
                    Khách hàng hài lòng
                  </h6>
                  <h3 className="display-6">
                    <span className="counter">100</span>+
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item mb-4">
                  <h6 className="mb-1 d-flex align-items-center justify-content-center text-info">
                    <i className="fa-solid fa-handshake-angle me-2"></i>
                    Đối tác liên kết
                  </h6>
                  <h3 className="display-6">
                    <span className="counter">89</span>+
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-bg">
        <img src="assets/img/bg/about-bg.png" alt="img" className="about-bg-01" />
        <img src="assets/img/bg/about-bg-01.svg" alt="img" className="about-bg-02" />
      </div>
    </div>
  </section>
);

export default AboutSection;