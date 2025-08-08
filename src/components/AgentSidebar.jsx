import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faList,
  faMoneyBillWave,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const AgentSidebar = () => (
  <div className="col-xl-3 col-lg-4 theiaStickySidebar">
    <div className="card shadow-sm border-0 mb-4 mb-lg-0">
      <div className="card-header bg-light text-center">
        <div className="d-flex flex-column align-items-center py-3">
          <img
            src="assets/img/users/user-43.jpg"
            alt="Ảnh đại diện"
            className="rounded-circle mb-2"
            style={{ width: 72, height: 72, objectFit: "cover", border: "2px solid #0d6efd" }}
          />
          <h6 className="fs-16 mb-1 mt-2">Chris Foxy</h6>
          <p className="fs-14 mb-2 text-muted">Thành viên từ 10/05/2025</p>
        </div>
      </div>
      <div className="card-body px-3">
        <ul className="list-unstyled mb-0">
          <li className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center"
              onClick={() => scrollToSection("dashboard-stats")}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2 text-primary" />
              Thống kê
            </button>
          </li>
          <li className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center"
              onClick={() => scrollToSection("recently-added")}
            >
              <FontAwesomeIcon icon={faList} className="me-2 text-success" />
              Người dùng mới
            </button>
          </li>
          <li className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center"
              onClick={() => scrollToSection("latest-invoices")}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-info" />
              Hóa đơn mới
            </button>
          </li>
          <li className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center"
              onClick={() => scrollToSection("recent-hotel-bookings")}
            >
              <FontAwesomeIcon icon={faList} className="me-2 text-warning" />
              Đơn đặt tour
            </button>
          </li>
          <li className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center"
              onClick={() => scrollToSection("recent-tour-bookings")}
            >
              <FontAwesomeIcon icon={faList} className="me-2 text-secondary" />
              Tour gần đây
            </button>
          </li>
          <li>
            <a
              href="/admin/feedback"
              className="btn btn-outline-primary w-100 text-start d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faCommentDots} className="me-2" />
              Feedback
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default AgentSidebar;