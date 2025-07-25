import React, { useEffect, useMemo } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function Gallery({ tour }) {
  // Dùng useMemo để tránh xử lý lại khi không cần
  const galleryImages = useMemo(() => {
    const tourMediaImages =
      tour?.tourMedia?.map((media) => ({
        thumb: media.mediaUrl,
        large: media.mediaUrl,
      })) ?? [];

    const itineraryImages =
      tour?.tourItineraries?.flatMap(
        (itinerary) =>
          itinerary.itineraryMedia?.map((media) => ({
            thumb: media.mediaUrl,
            large: media.mediaUrl,
          })) ?? []
      ) ?? [];

    const companyLogoImage = tour?.companyLogo
      ? [{ thumb: tour.companyLogo, large: tour.companyLogo }]
      : [];

    const seen = new Set();
    return [...companyLogoImage, ...tourMediaImages, ...itineraryImages].filter(
      (img) => {
        if (seen.has(img.thumb)) return false;
        seen.add(img.thumb);
        return true;
      }
    );
  }, [tour]);

  const groupedImages = useMemo(() => chunkArray(galleryImages, 4), [galleryImages]);

  useEffect(() => {
    // Cleanup cũ trước khi bind lại
    Fancybox.unbind("[data-fancybox='gallery']");
    Fancybox.bind("[data-fancybox='gallery']", {
      Toolbar: {
        display: [{ id: "counter", position: "center" }, "close"],
      },
      Thumbs: {
        autoStart: false,
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox='gallery']");
    };
  }, [galleryImages]); // Chỉ re-bind khi gallery thay đổi

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Gallery</h5>

      <div id="galleryCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {groupedImages.map((group, groupIdx) => (
            <div
              className={`carousel-item ${groupIdx === 0 ? "active" : ""}`}
              key={groupIdx}
            >
              <div className="row g-2">
                {group.map((img, idx) => (
                  <div className="col-6 col-md-3" key={img.thumb}>
                    <a
                      href={img.large}
                      data-fancybox="gallery"
                      data-caption={`Ảnh ${groupIdx * 4 + idx + 1}`}
                      className="d-block"
                    >
                      <img
                        src={img.thumb}
                        alt={`img-${groupIdx}-${idx}`}
                        className="img-fluid img-thumbnail"
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Điều hướng carousel */}
        {groupedImages.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Gallery;
