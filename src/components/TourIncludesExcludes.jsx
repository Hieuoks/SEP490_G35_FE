import React from "react";

function IncludesExcludes({ tour }) {
  const experiences = tour?.tourExperiences?.map(e => e.content) || [];

  // Chia đều thành 2 cột
  const mid = Math.ceil(experiences.length / 2);
  const leftCol = experiences.slice(0, mid);
  const rightCol = experiences.slice(mid);

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Trải nghiệm Tour</h5>
      <div className="row gy-2">
        <div className="col-md-6">
          {leftCol.length > 0 ? leftCol.map((item, idx) => (
            <p
              className={`d-flex align-items-center${idx < leftCol.length - 1 ? " mb-2" : ""}`}
              key={idx}
            >
              <i className="fas fa-check-square text-success me-2"></i> {item}
            </p>
          )) : <span className="text-muted">Không có trải nghiệm</span>}
        </div>
        <div className="col-md-6">
          {rightCol.length > 0 ? rightCol.map((item, idx) => (
            <p
              className={`d-flex align-items-center${idx < rightCol.length - 1 ? " mb-2" : ""}`}
              key={idx}
            >
              <i className="fas fa-check-square text-success me-2"></i> {item}
            </p>
          )) : null}
        </div>
      </div>
    </div>
  );
}

export default IncludesExcludes;