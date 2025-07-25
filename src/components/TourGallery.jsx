import React from "react";

const galleryImages = [
  {
    thumb: "assets/img/tours/gallery-tour-01.jpg",
    large: "assets/img/tours/gallery-tour-lg-01.jpg",
  },
  {
    thumb: "assets/img/tours/gallery-tour-02.jpg",
    large: "assets/img/tours/gallery-tour-lg-02.jpg",
  },
  {
    thumb: "assets/img/tours/gallery-tour-03.jpg",
    large: "assets/img/tours/gallery-tour-lg-03.jpg",
  },
  {
    thumb: "assets/img/tours/gallery-tour-04.jpg",
    large: "assets/img/tours/gallery-tour-lg-04.jpg",
  },
  {
    thumb: "assets/img/tours/gallery-tour-05.jpg",
    large: "assets/img/tours/gallery-tour-lg-05.jpg",
  },
  {
    thumb: "assets/img/tours/gallery-tour-06.jpg",
    large: "assets/img/tours/gallery-tour-lg-06.jpg",
  },
];

function Gallery() {
  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Gallery</h5>
      <div className="tour-gallery-slider owl-carousel">
        {galleryImages.map((img, idx) => (
          <a
            className="galley-wrap"
            data-fancybox="gallery"
            href={img.large}
            key={idx}
          >
            <img src={img.thumb} alt="img" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Gallery;