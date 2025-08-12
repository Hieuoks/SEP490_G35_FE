import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const EarningsCard = () => {
  const [year, setYear] = useState("2025");
  const years = ["2025", "2024", "2023"];

  return (
    <div className="col-xl-8 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6>Thu nhập</h6>
            <div className="dropdown">
              <button
                className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2 fs-14 text-gray-6" />
                {year}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                {years.map((y) => (
                  <li key={y}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setYear(y)}
                    >
                      <i className="fa-solid fa-circle me-1"></i>
                      {y}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="mb-2">
                <p className="mb-0">Tổng thu nhập năm nay</p>
                <h3>$20,659</h3>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fs-14">
                  <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                    <FontAwesomeIcon icon={faArrowUp} /> 12%
                  </span>
                  so với năm trước
                </p>
              </div>
            </div>
            <div id="earning-chart">
              <span className="text-muted">[Biểu đồ thu nhập]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;