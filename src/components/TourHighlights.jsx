import React from "react";

const highlights = [
  "Exclusive merchandise available at each show",
  "VIP packages with meet-and-greet options",
  "Special acoustic set in select cities",
];

function Highlights() {
  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Highlights</h5>
      <div>
        {highlights.map((text, idx) => (
          <div className={`d-flex align-items-center${idx < highlights.length - 1 ? " mb-2" : ""}`} key={idx}>
            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
              <i className="isax isax-send-sqaure-2 fs-16"></i>
            </span>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlights;