import React, { useState } from "react";
import {
  FaHeart,
  FaRankingStar,
  FaReceipt,
  FaCalendar,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// filepath: d:\OJT_ASS\SEP490_G35_FE\src\components\HomeListTour.jsx
export default function HomeListTour({ tour }) {
  const tours = tour?.data || [];
  const [startIndex, setStartIndex] = useState(0);
  const [imgIndexes, setImgIndexes] = useState(Array(tours.length).fill(0));
  const navigate = useNavigate();

  // Chuyển bộ 2 tour
  const handlePrevPair = () => {
    setStartIndex((prev) =>
      prev - 2 < 0 ? Math.max(tours.length - (tours.length % 2 === 0 ? 2 : 1), 0) : prev - 2
    );
  };

  const handleNextPair = () => {
    setStartIndex((prev) =>
      prev + 2 >= tours.length ? 0 : prev + 2
    );
  };

  // Chuyển ảnh cho từng tour
  const handlePrevImg = (tourIdx, mediaLength) => {
    setImgIndexes((prev) =>
      prev.map((idx, i) =>
        i === tourIdx ? (idx - 1 + mediaLength) % mediaLength : idx
      )
    );
  };

  const handleNextImg = (tourIdx, mediaLength) => {
    setImgIndexes((prev) =>
      prev.map((idx, i) =>
        i === tourIdx ? (idx + 1) % mediaLength : idx
      )
    );
  };

  if (tours.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="text-center py-5">Không có tour nào.</div>
        </div>
      </section>
    );
  }

  // Lấy 2 tour hiện tại
  const currentTours = tours.slice(startIndex, startIndex + 2);

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="section-header-six">
              <span className="badge badge-soft-primary rounded-pill mb-1">
                Tour được đánh giá cao
              </span>
              <h2>
                Các tour nổi bật trên thế giới
                <span className="text-primary">.</span>
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-end">
              <a href="tour-list" className="btn btn-dark sec-head-btn">
                Xem tất cả danh mục
                <FaArrowRight className="ms-2" />
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {currentTours.map((item, idx) => {
            const tourIdx = startIndex + idx;
            const media = Array.isArray(item.tourMedia) && item.tourMedia.length > 0
              ? item.tourMedia
              : ["assets/img/tours/tours-07.jpg"];
            const imgIndex = imgIndexes[tourIdx] ?? 0;

            return (
              <div className="col-md-6 d-flex" key={item.tourId || tourIdx}>
                <div
                  className="card flex-fill mb-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/tour/detail/${item.tourId}`)}
                >
                  <div className="place-img position-relative">
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 220 }}>
                      <button
                        className="btn btn-light btn-sm position-absolute start-0 top-50 translate-middle-y"
                        style={{ zIndex: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImg(tourIdx, media.length);
                        }}
                      >
                        <FaChevronLeft />
                      </button>
                      <img
                        src={media[imgIndex]}
                        className="img-fluid rounded"
                        alt={item.title}
                        style={{ maxHeight: 220, objectFit: "cover" }}
                      />
                      <button
                        className="btn btn-light btn-sm position-absolute end-0 top-50 translate-middle-y"
                        style={{ zIndex: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImg(tourIdx, media.length);
                        }}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                    <div className="fav-item position-absolute top-0 end-0 m-2">
                      <a href="javascript:void(0);" className="fav-icon selected">
                        <FaHeart />
                      </a>
                      <span className="badge bg-info d-inline-flex align-items-center ms-2">
                        <FaRankingStar className="me-1" />
                        Xu hướng
                      </span>
                    </div>
                  </div>
                  <div className="card-body place-content">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex flex-wrap align-items-center">
                        <span className="me-1">
                          <FaReceipt className="text-primary" />
                        </span>
                        <p className="fs-14 text-gray-9 text-truncate">
                          {item.companyName}
                        </p>
                      </div>
                      <div className="d-flex align-items-center flex-wrap">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                          {item.averageRating ?? "Chưa có"}
                        </span>
                        <p className="fs-14">
                          ({item.slotsBooked} lượt đặt)
                        </p>
                      </div>
                    </div>
                    <h5 className="mb-1 text-truncate">
                      <span>{item.title}</span>
                    </h5>
                    <p className="d-flex align-items-center mb-3">
                      <FaMapMarkerAlt className="me-2" />
                      {item.startPoint}
                    </p>
                    <div className="mb-3">
                      <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                        Giá trẻ em:
                        <span className="ms-1 fs-18 fw-semibold text-primary">
                          {item.priceOfChildren}đ
                        </span>
                        <span className="ms-3">Giá người lớn:</span>
                        <span className="ms-1 fs-18 fw-semibold text-primary">
                          {item.priceOfAdults}đ
                        </span>
                        <span className="ms-3">Giá em bé:</span>
                        <span className="ms-1 fs-18 fw-semibold text-primary">
                          {item.priceOfInfants}đ
                        </span>
                      </h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                      <div className="d-flex flex-wrap align-items-center me-2">
                        <span className="me-1">
                          <FaCalendar className="text-gray-6" />
                        </span>
                        <p className="fs-14 text-gray-9">
                          {item.durationInDays} ngày
                        </p>
                      </div>
                      <div className="ms-2 d-flex align-items-center">
                        <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                          <FaUserFriends className="me-1" />
                          {item.maxSlots} khách
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between px-3 pb-3">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrevPair}
            disabled={tours.length <= 2}
          >
            <FaChevronLeft /> Bộ trước
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNextPair}
            disabled={tours.length <= 2}
          >
            Bộ tiếp <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}