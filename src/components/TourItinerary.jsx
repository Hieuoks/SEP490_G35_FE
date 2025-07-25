import React from "react";

function Itinerary({ tour }) {
  if (!tour || !tour.tourItineraries || tour.tourItineraries.length === 0) {
    return null;
  }

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Itinerary</h5>
      <div className="card shadow-none mb-0">
        <div className="card-body p-3">
          <div className="stage-flow">
            {tour.tourItineraries.map((item) => (
              <div
                className="d-flex align-items-start justify-content-between flows-step mb-4"
                key={item.itineraryId}
              >
                <div className="d-flex">
                  <span className="flow-step me-3">
                    {item.dayNumber.toString().padStart(2, "0")}
                  </span>
                  <div className="flow-content">
                    <h6 className="fw-medium mb-1">{item.title}</h6>
                    <p className="mb-1">Day {item.dayNumber}</p>
                    <p className="mb-0">{item.description}</p>
                  </div>
                </div>

                <div className="avatar avatar-lg flex-shrink-0 ms-3">
  <img
    src={
      tour.tourMedia?.[0]?.mediaUrl ?? "https://via.placeholder.com/100"
    }
    alt="Tour Image"
    className="rounded-circle"
    style={{
      width: "64px",
      height: "64px",
      objectFit: "cover",
    }}
  />
</div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
