import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  // Hàm cắt description tối đa 20 từ
  const truncateDescription = (desc) => {
    if (!desc) return "";
    const words = desc.split(" ");
    if (words.length <= 20) return desc;
    return words.slice(0, 20).join(" ") + "...";
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
                    <div className="position-relative mb-3 d-flex justify-content-center align-items-center" style={{ minHeight: 180 }}>
                      <img
                        src={media[imgIndex]}
                        className="rounded-circle"
                        alt={p.companyName}
                        style={{ width: 140, height: 140, objectFit: "cover" }}
                      />
                    </div>
                    <h5 className="mb-2">
                      <span>{p.companyName}</span>
                    </h5>
                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                      <span>{truncateDescription(p.description)}</span>
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
    </div>
  </section>
);
}