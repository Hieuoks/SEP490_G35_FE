import React from "react";

const includes = [
  "Exclusive Merchandise",
  "Early Venue Access",
  "Acoustic Performance",
  "Tour Program",
  "Transportation (if applicable)",
];

const excludes = [
  "Travel Expenses",
  "Accommodation",
  "Food and Beverage",
  "Parking Fees",
  "Personal Expenses",
];

function IncludesExcludes() {
  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Includes & Excludes</h5>
      <div className="row gy-2">
        <div className="col-md-6">
          {includes.map((item, idx) => (
            <p
              className={`d-flex align-items-center${idx < includes.length - 1 ? " mb-2" : ""}`}
              key={idx}
            >
              <i className="isax isax-tick-square5 text-success me-2"></i> {item}
            </p>
          ))}
        </div>
        <div className="col-md-6">
          {excludes.map((item, idx) => (
            <p
              className={`d-flex align-items-center${idx < excludes.length - 1 ? " mb-2" : ""}`}
              key={idx}
            >
              <i className="isax isax-close-square5 text-danger me-2"></i> {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IncludesExcludes;