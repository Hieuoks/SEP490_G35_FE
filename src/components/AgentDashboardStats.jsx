import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faList,
  faMoneyBillWave,
  faStar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const AgentDashboardStats = ({
  totalBookings = 0,
  totalListings = 0,
  totalIncome = 0,
  totalReviews = 0,
}) => (
  <div className="row">
    <div className="col-xl-3 col-sm-6 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body text-center">
          <span className="avatar avatar rounded-circle bg-success mb-2">
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
          </span>
          <p className="mb-1">Tổng số đơn đặt</p>
          <h5 className="mb-2">{totalBookings}</h5>
          <p className="d-flex align-items-center justify-content-center fs-14">
            <FontAwesomeIcon icon={faArrowUp} className="me-1 text-success" />
            20% so với tháng trước
          </p>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body text-center">
          <span className="avatar avatar rounded-circle bg-orange mb-2">
            <FontAwesomeIcon icon={faList} size="lg" />
          </span>
          <p className="mb-1">Tổng số danh sách</p>
          <h5 className="mb-2">{totalListings}</h5>
          <a href="/agent-listings" className="fs-14 link-primary text-decoration-underline">
            Xem tất cả
          </a>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body text-center">
          <span className="avatar avatar rounded-circle bg-info mb-2">
            <FontAwesomeIcon icon={faMoneyBillWave} size="lg" />
          </span>
          <p className="mb-1">Tổng thu nhập</p>
          <h5 className="mb-2">${totalIncome}</h5>
          <p className="d-flex align-items-center justify-content-center fs-14">
            <FontAwesomeIcon icon={faArrowDown} className="me-1 text-danger" />
            15% so với tháng trước
          </p>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body text-center">
          <span className="avatar avatar rounded-circle bg-indigo mb-2">
            <FontAwesomeIcon icon={faStar} size="lg" />
          </span>
          <p className="mb-1">Tổng đánh giá</p>
          <h5 className="mb-2">{totalReviews}</h5>
          <a href="/agent-review" className="fs-14 link-primary text-decoration-underline">
            Xem tất cả
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AgentDashboardStats;