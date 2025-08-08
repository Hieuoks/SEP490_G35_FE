// HowItWorksVN.jsx
import React from "react";
import { FaBuilding, FaCalendarCheck, FaPaperPlane } from "react-icons/fa6";

const steps = [
  {
    icon: <FaBuilding className="text-teal" size={32} />,
    bgClass: "bg-teal-trans",
    number: "01",
    title: "Kiểm tra tình trạng còn chỗ",
    desc: "Đảm bảo tour còn chỗ vào ngày bạn muốn đi. Duyệt các tour có sẵn tại điểm đến của bạn.",
  },
  {
    icon: <FaCalendarCheck className="text-primary" size={32} />,
    bgClass: "bg-prime-trans",
    number: "02",
    title: "Đặt tour & Xác nhận",
    desc: "Khi đến nơi, hãy check-in tại quầy lễ tân. Nhân viên thân thiện sẽ hướng dẫn bạn các thủ tục.",
  },
  {
    icon: <FaPaperPlane className="text-purple" size={32} />,
    bgClass: "bg-purple-trans",
    number: "03",
    title: "Tận hưởng chuyến đi",
    desc: "Đến điểm tập trung đúng giờ, đặt câu hỏi và tận hưởng trải nghiệm!",
  },
];

function HowItWorksVN() {
  return (
    <section className="section work-section-six">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-3 col-lg-4">
            <div className="section-header-six mb-0 wow fadeInUp" data-wow-delay="1.5">
              <span className="badge badge-soft-primary rounded-pill mb-1">Quy trình hoạt động</span>
              <h2>
                Quy trình đặt tour tại DreamsTour<span className="text-primary">.</span>
              </h2>
            </div>
          </div>
          <div className="col-xxl-9 col-lg-8">
            <div className="row align-items-center">
              {steps.map((step, idx) => (
                <div className="col-md-4 col-sm-6" key={idx}>
                  <div className={`${step.bgClass} mb-4 wow fadeInUp`} data-wow-delay="1.5">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <span className="work-icon d-flex">{step.icon}</span>
                          <span className="work-avatar">{step.number}</span>
                        </div>
                        <div>
                          <h5 className="mb-2 text-truncate">{step.title}</h5>
                          <p className="text-truncate line-clamb-3">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksVN;