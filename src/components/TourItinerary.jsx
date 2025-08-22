import React, { useState } from "react";

function Itinerary({ tour }) {
  if (!tour || !tour.tourItineraries || tour.tourItineraries.length === 0) {
    return (
      <div className="bg-light-200 card-bg-light mb-4">
        <h5 className="fs-18 mb-3">Lịch trình tour</h5>
        <div className="text-center text-muted py-4">Không có lịch trình.</div>
      </div>
    );
  }

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Lịch trình tour</h5>
      <div className="card shadow-none mb-0">
        <div className="card-body p-3">
          <div className="stage-flow">
            {tour.tourItineraries.map((item) => (
              <ItineraryStep key={item.itineraryId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component cho từng ngày lịch trình, xử lý slider ảnh vuông
function ItineraryStep({ item }) {
  const medias = item.itineraryMedia || [];
  const [imgIdx, setImgIdx] = useState(0);

  const handlePrev = (e) => {
    e.preventDefault();
    setImgIdx((prev) => (prev - 1 + medias.length) % medias.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setImgIdx((prev) => (prev + 1) % medias.length);
  };

  // Kích thước ảnh vuông lớn hơn ~1/5 so với 80px: 80 * 1.2 = 96px (có thể làm tròn thành 100px)
  const imgSize = 100;

  return (
    <div className="d-flex align-items-start justify-content-between flows-step mb-4">
      <div className="d-flex">
        <span className="flow-step me-3">
          {item.dayNumber.toString().padStart(2, "0")}
        </span>
        <div className="flow-content">
          <h6 className="fw-medium mb-1">{item.title}</h6>
          <p className="mb-1">Ngày {item.dayNumber}</p>
          <p className="mb-0">{item.description}</p>
        </div>
      </div>
      <div className=" flex-shrink-0 ms-3 d-flex flex-column align-items-center">
        {medias.length > 0 ? (
          <div style={{ position: "relative" }}>
            <img
              src={medias[imgIdx].mediaUrl}
              alt="Itinerary"
              style={{
                width: `${imgSize}px`,
                height: `${imgSize}px`,
                objectFit: "cover",
                border: "1px solid #eee",
                borderRadius: "8px",
                display: "block"
              }}
            />
            {medias.length > 1 && (
              <div className="d-flex justify-content-between mt-2" style={{ width: imgSize }}>
                <button
                  className="btn btn-sm btn-light px-1 py-0"
                  style={{ fontSize: 16 }}
                  onClick={handlePrev}
                  title="Ảnh trước"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="btn btn-sm btn-light px-1 py-0"
                  style={{ fontSize: 16 }}
                  onClick={handleNext}
                  title="Ảnh sau"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        ) : (
          <img
            src="https://via.placeholder.com/100"
            alt="Tour Image"
            style={{
              width: `${imgSize}px`,
              height: `${imgSize}px`,
              objectFit: "cover",
              border: "1px solid #eee",
              borderRadius: "8px",
              display: "block"
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Itinerary;