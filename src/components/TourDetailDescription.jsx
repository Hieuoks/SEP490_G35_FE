import React, { useState } from "react";

function Description() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Description</h5>
      <div className="mb-2">
        <p>
          Kicking off on April 1, 2025, the "DreamsTour" will take Luna to major cities across North America and Europe, including Los Angeles, New York, Chicago, Toronto, and London. Each concert will showcase her unique blend of pop
          and ethereal soundscapes, bringing her music to life in a way you've never seen before.
        </p>
      </div>
      <div className="read-more">
        {showMore && (
          <div className="more-text">
            <p>
              Each concert will showcase her unique blend of pop and ethereal soundscapes, bringing her music to life in a way you've never seen before.
            </p>
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
    </div>
  );
}

export default Description;