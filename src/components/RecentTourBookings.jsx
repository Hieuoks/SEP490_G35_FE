import React, { useState } from "react";

const PAGE_SIZE = 5;

const RecentTourBookings = ({ tours }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Chỉ lọc theo title
  const filteredTours = (tours?.data || []).filter(
    (t) =>
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTours.length / PAGE_SIZE);
  const pagedTours = filteredTours.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Format ngày
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <div className="card hotel-list mb-0">
      <div className="card-body p-0">
        <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
          <h6 className="">Tour gần đây</h6>
          <div className="d-flex align-items-center flex-wrap">
            <div className="input-icon-start position-relative">
              <span className="icon-addon">
                <i className="fa-solid fa-magnifying-glass fs-14"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên tour"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="custom-datatable-filter table-responsive">
          <table className="table datatable">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Tên tour</th>
                <th>Điểm khởi hành</th>
                <th>Phương tiện</th>
                <th>Ngày tạo</th>
                <th>Giá người lớn</th>
                <th>Giá trẻ em</th>
                <th>Giá em bé</th>
                <th>Đã đặt</th>
                <th>Đánh giá TB</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {pagedTours.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center">Không có tour nào.</td>
                </tr>
              ) : (
                pagedTours.map((t) => (
                  <tr key={t.tourId}>
                    <td>{t.tourId}</td>
                    <td>{t.title}</td>
                    <td>{t.startPoint}</td>
                    <td>{t.transportation}</td>
                    <td>{formatDate(t.createdAt)}</td>
                    <td>{t.priceOfAdults}</td>
                    <td>{t.priceOfChildren}</td>
                    <td>{t.priceOfInfants}</td>
                    <td>{t.slotsBooked}/{t.maxSlots}</td>
                    <td>{t.averageRating ?? "Chưa có"}</td>
                    <td>
                      <span className={`badge ${t.isActive ? "badge-info" : "badge-secondary"} rounded-pill`}>
                        {t.isActive ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Trước
            </button>
            <span className="mx-2 align-self-center">
              Trang {page} / {totalPages}
            </span>
            <button
              className="btn btn-outline-primary btn-sm ms-2"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTourBookings;