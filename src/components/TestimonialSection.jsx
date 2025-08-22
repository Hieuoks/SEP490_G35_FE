import React, { useRef, useState } from "react";

const MAX_FEEDBACKS = 10;

const TestimonialSection = ({ feedback }) => {
  // Lọc feedback có rating = 5 và isActive = true
  const filteredFeedbacks =
    feedback?.data?.feedbacks?.filter((item) => item.rating === 5 && item.isActive) || [];

  // Lặp lại nếu không đủ 10 feedback
  let displayFeedbacks = [];
  if (filteredFeedbacks.length > 0) {
    while (displayFeedbacks.length < MAX_FEEDBACKS) {
      displayFeedbacks = displayFeedbacks.concat(filteredFeedbacks);
      if (displayFeedbacks.length >= MAX_FEEDBACKS) break;
    }
    displayFeedbacks = displayFeedbacks.slice(0, MAX_FEEDBACKS);
  }

  // Carousel state
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 4; // Số feedback hiển thị cùng lúc

  const handlePrev = () => {
    setStartIdx((prev) =>
      prev === 0 ? displayFeedbacks.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      prev + visibleCount >= displayFeedbacks.length
        ? 0
        : prev + 1
    );
  };

  // Lấy các feedback hiển thị
  const visibleFeedbacks =
    displayFeedbacks.length > 0
      ? [
          ...displayFeedbacks.slice(startIdx, startIdx + visibleCount),
          ...(startIdx + visibleCount > displayFeedbacks.length
            ? displayFeedbacks.slice(0, startIdx + visibleCount - displayFeedbacks.length)
            : []),
        ]
      : [];

  return (
    <section className="section testimonial-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-10 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-2">
                Khách hàng <span className="text-primary text-decoration-underline">nói gì</span> về chúng tôi
              </h2>
              <p className="sub-title">
                DreamsTour - đơn vị tổ chức tour chuyên nghiệp, mang đến nhiều lợi ích và trải nghiệm tuyệt vời cho du khách.
              </p>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <button
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
            style={{ zIndex: 2, left: -30 }}
            onClick={handlePrev}
            aria-label="Trước"
            disabled={displayFeedbacks.length === 0}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="testimonial-slider row g-4 flex-nowrap" style={{ overflow: "hidden" }}>
            {visibleFeedbacks.length === 0 && (
              <div className="col-12 text-center">
                <p>Chưa có đánh giá 5 sao nào.</p>
              </div>
            )}
            {visibleFeedbacks.map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={item.ratingId || idx}>
                <div className="card border-white wow fadeInUp" data-wow-delay="0.2s">
                  <div className="card-body">
                    <h6 className="mb-4">{item.tourName || "Tour"}</h6>
                    <p className="mb-4">{item.comment}</p>
                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-md flex-shrink-0">
                          <img
                            src={
                              item.mediaUrl && item.mediaUrl !== "string"
                                ? item.mediaUrl
                                : "assets/img/users/user-01.jpg"
                            }
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        
                      <div className="ms-2">
  <div className="d-flex align-items-center gap-2 mb-1">
    <h6 className="fs-16 fw-medium mb-0">{item.userName}</h6>
    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium">
      {item.rating.toFixed(1)}
    </span>
  </div>
  <p className="mb-0 text-muted" style={{ fontSize: 13 }}>
    {item.userEmail}
    
  </p>
</div>

                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
            style={{ zIndex: 2, right: -30 }}
            onClick={handleNext}
            aria-label="Sau"
            disabled={displayFeedbacks.length === 0}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="testimonial-bg">
        <img src="assets/img/bg/testimonial-bg-01.svg" alt="img" />
      </div>
    </section>
  );
};

export default TestimonialSection;