import React from "react";

const benefits = [
  {
    icon: "fa-solid fa-bolt",
    bg: "bg-warning text-white",
    title: "Nhanh chóng",
    desc: "Đặt tour và thanh toán chỉ trong vài bước đơn giản, tiết kiệm thời gian.",
    iconView: "text-warning",
  },
  {
    icon: "fa-solid fa-hand-holding-heart",
    bg: "bg-info text-white",
    title: "Tiện lợi",
    desc: "Dễ dàng lựa chọn, so sánh và đặt tour mọi lúc, mọi nơi trên mọi thiết bị.",
    iconView: "text-info",
  },
  {
    icon: "fa-solid fa-shield-check",
    bg: "bg-success text-white",
    title: "Đáng tin",
    desc: "Đối tác uy tín, thông tin minh bạch, cam kết chất lượng dịch vụ.",
    iconView: "text-success",
  },
  {
    icon: "fa-solid fa-lock",
    bg: "bg-dark text-white",
    title: "Bảo mật",
    desc: "Bảo vệ thông tin cá nhân và giao dịch của khách hàng tuyệt đối.",
    iconView: "text-dark",
  },
];

const BenefitSection = () => (
  <section className="section benefit-section bg-light-300">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
          <div className="section-header text-center">
            <h2 className="mb-2">
              <span className="text-primary text-decoration-underline">Lợi ích</span> & Ưu điểm nổi bật
            </h2>
            <p className="sub-title">
              DreamsTour mang đến trải nghiệm đặt tour du lịch nhanh chóng, tiện lợi, đáng tin và bảo mật cho khách hàng.
            </p>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {benefits.map((b, idx) => (
          <div className="col-sm-6 col-lg-3 d-flex" key={idx}>
            <div className="card benefit-card mb-0 flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="card-body text-center">
                <div className={`benefit-icon mb-2 ${b.bg} mx-auto`} style={{ fontSize: 36 }}>
                  <i className={b.icon}></i>
                </div>
                <h5 className="mb-2">{b.title}</h5>
                <p className="mb-0">{b.desc}</p>
                <span className={`icon-view ${b.iconView}`}>
                  <i className={b.icon}></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitSection;