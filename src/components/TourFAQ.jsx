import React, { useState } from "react";

const faqs = [
  {
    question: "Tôi có thể hủy tour và được hoàn tiền không?",
    answer:
      "Bạn có thể hủy tour và được hoàn tiền nếu đáp ứng đúng chính sách hoàn hủy của chúng tôi. Vui lòng kiểm tra điều kiện hoàn hủy cụ thể của từng tour trước khi đặt.",
  },
  {
    question: "Tour có bao gồm bảo hiểm du lịch không?",
    answer:
      "Hầu hết các tour đều đã bao gồm bảo hiểm du lịch cơ bản. Thông tin chi tiết về bảo hiểm sẽ được cung cấp trong phần mô tả tour hoặc liên hệ tổng đài để được tư vấn.",
  },
  {
    question: "Tôi có thể mang theo trẻ nhỏ hoặc người lớn tuổi không?",
    answer:
      "Bạn hoàn toàn có thể đăng ký tour cho trẻ nhỏ hoặc người lớn tuổi. Tuy nhiên, một số tour có giới hạn độ tuổi hoặc yêu cầu sức khỏe, vui lòng xem kỹ thông tin tour hoặc liên hệ để được tư vấn.",
  },
  {
    question: "Có hỗ trợ đưa đón sân bay không?",
    answer:
      "Nhiều tour có hỗ trợ dịch vụ đưa đón sân bay miễn phí hoặc tính phí tùy theo chương trình. Vui lòng kiểm tra thông tin chi tiết trong mô tả tour.",
  },
  {
    question: "Tôi cần chuẩn bị giấy tờ gì khi đi tour?",
    answer:
      "Bạn cần mang theo giấy tờ tùy thân hợp lệ (CMND/CCCD/hộ chiếu), vé điện tử hoặc xác nhận đặt tour. Một số tour quốc tế có thể yêu cầu visa.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Câu hỏi thường gặp khi đi du lịch</h5>
      <div className="accordion faq-accordion" id="accordionFaq">
        {faqs.map((faq, idx) => (
          <div className={`accordion-item${openIndex === idx ? " show" : ""} mb-2`} key={idx}>
            <div className="accordion-header">
              <button
                className={`accordion-button fw-medium${openIndex === idx ? "" : " collapsed"}`}
                type="button"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-collapse-${idx}`}
                onClick={() => handleToggle(idx)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="me-2">
                  {openIndex === idx ? (
                    <i className="bi bi-dash-circle-fill text-primary"></i>
                  ) : (
                    <i className="bi bi-plus-circle-fill text-secondary"></i>
                  )}
                </span>
                {faq.question}
              </button>
            </div>
            <div
              id={`faq-collapse-${idx}`}
              className={`accordion-collapse collapse${openIndex === idx ? " show" : ""}`}
              data-bs-parent="#accordionFaq"
            >
              <div className="accordion-body">
                <p className="mb-0">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;