import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const BookingStatisticsCard = () => {
  const [year, setYear] = useState("2025");
  const years = ["2025", "2024", "2023"];

  // Dummy data, có thể truyền qua props nếu cần động
  const stats = [
    { label: "Khách sạn", value: 16, color: "teal" },
    { label: "Chuyến bay", value: 12, color: "secondary" },
    { label: "Xe", value: 14, color: "purple" },
    { label: "Du thuyền", value: 16, color: "dark" },
    { label: "Tour", value: 4, color: "primary" },
  ];

  return (
    <div className="col-xl-4 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6>Thống kê đặt phòng</h6>
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
          <div className="text-center mb-3">
            {/* Biểu đồ có thể nhúng ở đây */}
            <div id="booking-chart">
              <span className="text-muted">[Biểu đồ đặt phòng]</span>
            </div>
          </div>
          {stats.map((item, idx) => (
            <div
              className={`d-flex align-items-center justify-content-between mb-${idx === stats.length - 1 ? "0" : "2"}`}
              key={item.label}
            >
              <h6 className={`border-icon ${item.color}`}>{item.label}</h6>
              <p className="fs-14">
                <span className="text-gray-9 fw-medium">{item.value.toString().padStart(2, "0")}</span> Đặt phòng
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStatisticsCard;