// FeaturedCategories.jsx
import React from "react";

const categories = [
  {
    img: "assets/img/tours/tours-30.jpg",
    title: "Ecotourism",
    tours: 25,
    delay: "0.5",
  },
  {
    img: "assets/img/tours/tours-31.jpg",
    title: "Adventure Tour",
    tours: 47,
    delay: "1.0",
  },
  {
    img: "assets/img/tours/tours-32.jpg",
    title: "Group Tours",
    tours: 38,
    delay: "1.5",
  },
  {
    img: "assets/img/tours/tours-33.jpg",
    title: "Beach Tours",
    tours: 54,
    delay: "2.0",
  },
  {
    img: "assets/img/tours/tours-34.jpg",
    title: "Honey Moon",
    tours: 22,
    delay: "2.5",
  },
  {
    img: "assets/img/tours/tours-30.jpg",
    title: "Ecotourism",
    tours: 25,
    delay: "3.0",
  },
  {
    img: "assets/img/tours/tours-31.jpg",
    title: "Adventure Tour",
    tours: 47,
    delay: "3.5",
  },
];

function FeaturedCategories() {
  return (
    <section className="section destination-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header-six">
              <span className="badge badge-soft-primary rounded-pill mb-1">
                Featured Categories
              </span>
              <h2>
                Travelers & Preferences<span className="text-primary">.</span>
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-end">
              <a href="tour-grid.html" className="btn btn-dark sec-head-btn">
                View All Categories
                <i className="isax isax-arrow-right-3 ms-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="categories-slider-six owl-carousel">
          {categories.map((cat, idx) => (
            <div
              className="categories-card wow fadeInUp"
              data-wow-delay={cat.delay}
              key={idx}
            >
              <a href="tour-grid.html">
                <img src={cat.img} alt="Img" />
              </a>
              <div className="cat-content d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="text-white mb-1">{cat.title}</h5>
                  <span className="text-white">{cat.tours} Tours</span>
                </div>
                <a href="tour-grid.html" className="loc-view-bottom">
                  <i className="isax isax-arrow-right-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;