import React from "react";
import { FaLock, FaReceipt, FaMapMarkerAlt } from "react-icons/fa";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";

const leftCards = [
  {
    icon: <FaLock className="text-gray-9 fs-5" />,
    bg: "bg-secondary",
    border: "border-secondary",
    title: "Gói VIP",
    desc: "Bao gồm chỗ ngồi cao cấp, gặp gỡ nghệ sĩ, tham quan hậu trường.",
  },
  {
    icon: <FaReceipt className="fs-5" />,
    bg: "bg-purple",
    border: "border-purple",
    title: "Gói du lịch",
    desc: "Gói bao gồm vé sự kiện, chỗ ở.",
  },
  {
    icon: <FaMapMarkerAlt className="fs-5" />,
    bg: "bg-teal",
    border: "border-teal",
    title: "Cam kết giá tốt nhất",
    desc: "Như tập luyện riêng, tham dự kiểm tra âm thanh.",
  },
];

const faqs = [
  {
    question: "Bạn cung cấp những loại tour nào?",
    answer: (
      <>
        <p className="mb-0">
          Chúng tôi cung cấp đa dạng các tour: văn hóa, phiêu lưu, sang trọng và lịch trình cá nhân hóa.
        </p>
        <p>Điểm đến nổi bật gồm châu Âu, châu Phi (ví dụ: Morocco), ...</p>
      </>
    ),
  },
  {
    question: "Các tour có thể tùy chỉnh không?",
    answer: (
      <p>
        Chúng tôi cung cấp đa dạng các tour: văn hóa, phiêu lưu, sang trọng và lịch trình cá nhân hóa.
      </p>
    ),
  },
  {
    question: "Bạn áp dụng các biện pháp an toàn nào?",
    answer: (
      <p>
        Chúng tôi cung cấp đa dạng các tour: văn hóa, phiêu lưu, sang trọng và lịch trình cá nhân hóa.
      </p>
    ),
  },
  {
    question: "Nên đặt tour trước bao lâu?",
    answer: (
      <p>
        Chúng tôi cung cấp đa dạng các tour: văn hóa, phiêu lưu, sang trọng và lịch trình cá nhân hóa.
      </p>
    ),
  },
  {
    question: "Chính sách hủy tour của bạn là gì?",
    answer: (
      <p>
        Chúng tôi cung cấp đa dạng các tour: văn hóa, phiêu lưu, sang trọng và lịch trình cá nhân hóa.
      </p>
    ),
  },
];

export default function FaqTourSection() {
  const [open, setOpen] = React.useState("0");
  const toggle = (id) => setOpen(open === id ? undefined : id);

  return (
    <section className="section bg-light-200 faq-sec">
      <div className="container">
        <div className="row">
          {/* Left Info */}
          <div className="col-lg-6">
            <div className="tourism-text-info">
              <div className="text-header">
                <h2>
                  Giải pháp đáng tin cậy cho dịch vụ{" "}
                  <span className="text-primary">
                    <img src="assets/img/tours/tour-img.jpg" alt="Img" style={{ width: 40, borderRadius: 8 }} /> Du lịch
                  </span>
                </h2>
              </div>
              {leftCards.map((card, idx) => (
                <div
                  className={`card ${card.border} shadow-none ${card.bg}-transparent`}
                  key={idx}
                >
                  <div className="card-body d-flex align-items-center">
                    <span className={`avatar ${card.bg} rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center`} style={{ width: 40, height: 40 }}>
                      {card.icon}
                    </span>
                    <div className="ms-3">
                      <h5 className="mb-1">{card.title}</h5>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right FAQ */}
          <div className="col-lg-6">
            <div className="faq-cards-six">
              <div className="section-header-six mb-4">
                <span className="badge badge-soft-primary rounded-pill mb-1">
                  Nhà cung cấp phổ biến nhất
                </span>
                <h2>Trải nghiệm chỗ ở thư giãn.</h2>
              </div>
              <Accordion open={open} toggle={toggle} flush>
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx}>
                    <AccordionHeader targetId={String(idx)}>
                      {faq.question}
                    </AccordionHeader>
                    <AccordionBody accordionId={String(idx)}>
                      {faq.answer}
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}