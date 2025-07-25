import React, { useState } from "react";

function Description({ tour }) {
  const [showMore, setShowMore] = useState(false);

  const shortDesc = tour?.description || "";
  const moreDesc = tour?.note || "";

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Description</h5>
      <div className="mb-2">
        <p>{shortDesc}</p>
      </div>
      {moreDesc && (
        <div className="read-more">
          {showMore && (
            <div className="more-text">
              <p>{moreDesc}</p>
            </div>
          )}
          <a
            href="#"
            className="fs-14 fw-medium more-link text-decoration-underline mb-2"
            onClick={e => {
              e.preventDefault();
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </a>
        </div>
      )}
    </div>
  );
}

export default Description;