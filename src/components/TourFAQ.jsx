import React, { useState } from "react";

const faqs = [
  {
    question: "Does offer free cancellation for a full refund?",
    answer:
      "Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.",
  },
  {
    question: "Is there a pool?",
    answer:
      "Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation  policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.",
  },
  {
    question: "Is airport shuttle service offered?",
    answer:
      "Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Frequently Asked Questions</h5>
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
              >
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