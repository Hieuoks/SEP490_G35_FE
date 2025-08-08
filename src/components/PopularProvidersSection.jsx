import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// filepath: d:\OJT_ASS\SEP490_G35_FE\src\components\PopularProvidersSection.jsx
export default function PopularProvidersSection({ tourOp }) {
  const operators = tourOp?.tourOperators || [];
  const [startIndex, setStartIndex] = useState(0);
  const [imgIndexes, setImgIndexes] = useState(Array(operators.length).fill(0));
  const navigate = useNavigate();

  // Chuyển bộ 3 provider
  const handlePrevGroup = () => {
    setStartIndex((prev) =>
      prev - 3 < 0 ? Math.max(operators.length - (operators.length % 3 === 0 ? 3 : operators.length % 3), 0) : prev - 3
    );
  };

  const handleNextGroup = () => {
    setStartIndex((prev) =>
      prev + 3 >= operators.length ? 0 : prev + 3
    );
  };

  // Chuyển ảnh cho từng provider
  const handlePrevImg = (idx, mediaLength) => {
    setImgIndexes((prev) =>
      prev.map((imgIdx, i) =>
        i === idx ? (imgIdx - 1 + mediaLength) % mediaLength : imgIdx
      )
    );
  };

  const handleNextImg = (idx, mediaLength) => {
    setImgIndexes((prev) =>
      prev.map((imgIdx, i) =>
        i === idx ? (imgIdx + 1) % mediaLength : imgIdx
      )
    );
  };

  // Lấy 3 provider hiện tại
  const currentProviders = operators.slice(startIndex, startIndex + 3);

  // Xử lý chuyển trang chi tiết
  const handleGoDetail = (id) => {
    navigate(`/tour-operator/detail/${id}`);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="section-header-six">
              <span className="badge badge-soft-primary rounded-pill mb-1">
                Nhà cung cấp phổ biến nhất
              </span>
              <h2>
                Trải nghiệm chỗ ở thư giãn<span className="text-primary">.</span>
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-end">
              <a href="tour-operator" className="btn btn-dark sec-head-btn">
                Xem tất cả nhà cung cấp
                <FaArrowRight className="ms-2" />
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {currentProviders.length === 0 ? (
            <div className="text-center py-5">Không có nhà cung cấp nào.</div>
          ) : (
            currentProviders.map((p, idx) => {
              const providerIdx = startIndex + idx;
              const media =
                Array.isArray(p.media) && p.media.length > 0
                  ? p.media.map((m) => m.mediaUrl)
                  : p.companyLogo
                  ? [p.companyLogo]
                  : ["assets/img/icons/providers-logo.svg"];
              const imgIndex = imgIndexes[providerIdx] ?? 0;

              return (
                <div className="col-md-4 mb-4" key={p.tourOperatorId || providerIdx}>
                  <div
                    className="card h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleGoDetail(p.tourOperatorId)}
                  >
                    <div className="card-body text-center">
                      <div className="position-relative mb-3" style={{ minHeight: 100 }}>
                        <button
                          className="btn btn-light btn-sm position-absolute start-0 top-50 translate-middle-y"
                          style={{ zIndex: 2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImg(providerIdx, media.length);
                          }}
                          disabled={media.length <= 1}
                        >
                          &lt;
                        </button>
                        <img
                          src={media[imgIndex]}
                          className="rounded-circle w-auto m-auto"
                          alt={p.companyName}
                          style={{ maxWidth: 80, maxHeight: 80 }}
                        />
                        <button
                          className="btn btn-light btn-sm position-absolute end-0 top-50 translate-middle-y"
                          style={{ zIndex: 2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImg(providerIdx, media.length);
                          }}
                          disabled={media.length <= 1}
                        >
                          &gt;
                        </button>
                      </div>
                      <h5 className="mb-2">
                        <span>{p.companyName}</span>
                      </h5>
                      <div className="d-flex align-items-center seperate-dot justify-content-center">
                        <span>{p.description}</span>
                        <span>{p.address}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            {p.rating ?? "4.9"}
                          </span>
                          <FaStar className="text-warning me-1" />
                        </div>
                        {/* Có thể thêm số tour nếu có */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="d-flex justify-content-between px-3 pb-3">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrevGroup}
            disabled={operators.length <= 3}
          >
            &lt; Bộ trước
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNextGroup}
            disabled={operators.length <= 3}
          >
            Bộ tiếp &gt;
          </button>
        </div>
      </div>
    </section>
  );
}