import React from "react";

const largeImages = [
  "assets/img/tours/tour-large-01.jpg",
  "assets/img/tours/tour-large-02.jpg",
  "assets/img/tours/tour-large-03.jpg",
  "assets/img/tours/tour-large-04.jpg",
  "assets/img/tours/tour-large-05.jpg",
];

const thumbImages = [
  "assets/img/tours/tour-thumb-01.jpg",
  "assets/img/tours/tour-thumb-02.jpg",
  "assets/img/tours/tour-thumb-03.jpg",
  "assets/img/tours/tour-thumb-04.jpg",
  "assets/img/tours/tour-thumb-05.jpg",
];

function TourSlider() {
  return (
    <div>
      <div className="service-wrap mb-4">
        <div className="slider-wrap vertical-slider tour-vertical-slide d-flex align-items-center">
          <div className="slider-for nav-center" id="large-img">
            {largeImages.map((src, idx) => (
              <div className="service-img" key={idx}>
                <img src={src} className="img-fluid" alt="Slider Img" />
              </div>
            ))}
          </div>
          <a
            href={largeImages[0]}
            data-fancybox="gallery"
            className="btn btn-white btn-xs view-btn"
          >
            <i className="isax isax-image me-1"></i>See All
          </a>
          <div className="slider-nav nav-center" id="small-img">
            {thumbImages.map((src, idx) => (
              <div key={idx}>
                <img src={src} className="img-fluid" alt="Slider Img" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="mb-2">
          <h4 className="mb-1 d-flex align-items-center flex-wrap mb-2">
            Rainbow Mountain Valley
            <span className="badge badge-xs bg-success rounded-pill ms-2">
              <i className="isax isax-ticket-star me-1"></i>Verified
            </span>
          </h4>
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <i className="isax isax-receipt text-primary me-2"></i>Adventure Tour
            </p>
            <p className="fs-14 mb-2 me-3 pe-3 border-end">
              <i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona
              <a
                href="#location"
                className="link-primary text-decoration-underline fw-medium ms-2"
              >
                View Location
              </a>
            </p>
            <div className="d-flex align-items-center mb-2">
              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                5.0
              </span>
              <p className="fs-14">
                <a href="#reviews">(400 Reviews)</a>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <a
            href="javascript:void(0);"
            className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
          >
            <i className="isax isax-share"></i>
          </a>
          <a
            href="javascript:void(0);"
            className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
          >
            <i className="isax isax-heart5 text-danger me-1"></i>Save
          </a>
        </div>
      </div>
    </div>
  );
}

export default TourSlider;