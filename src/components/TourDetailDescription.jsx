import React, { useState } from "react";

function Description({ tour }) {
  const [showMore, setShowMore] = useState(false);

  const shortDesc = tour?.description || "";
  const moreDesc = tour?.note || "";

  // Cắt description thành 20 từ đầu, nếu dài hơn thì thêm "..."
  const words = shortDesc.split(" ");
  const isLong = words.length > 20;
  const shortText = isLong ? words.slice(0, 20).join(" ") + "..." : shortDesc;

  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Mô tả chi tiết</h5>
      <div className="mb-2">
        <p>{showMore || !isLong ? shortDesc : shortText}</p>
      </div>
      {(isLong || moreDesc) && (
        <div className="read-more">
          {showMore && moreDesc && (
            <div className="more-text">
              <p>
                <strong>Ghi chú:</strong> {moreDesc}
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
            {showMore ? "Thu gọn" : "Xem thêm"}
          </a>
        </div>
      )}
    </div>
  );
}

export default Description;