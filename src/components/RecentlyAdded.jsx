import React, { useState } from "react";

const PAGE_SIZE = 3;

const RecentlyAdded = ({ accounts }) => {
  const users = accounts?.data || [];
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const pagedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body">
          <h6 className="mb-4">Người dùng mới thêm gần đây</h6>
          {pagedUsers.length === 0 ? (
            <p>Không có người dùng nào.</p>
          ) : (
            pagedUsers.map((user, idx) => (
              <div
                className={`d-flex justify-content-between align-items-center${idx < pagedUsers.length - 1 ? " mb-4" : ""}`}
                key={user.userId}
              >
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-lg flex-shrink-0 me-2">
                    <img
                      src={user.avatar && user.avatar !== "string" ? user.avatar : "https://ui-avatars.com/api/?name=" + user.userName}
                      className="img-fluid rounded-circle"
                      alt={user.userName}
                    />
                  </span>
                  <div>
                    <h6 className="fs-16 mb-1">{user.userName}</h6>
                    <p className="fs-14 mb-0">Email: {user.email}</p>
                    <p className="fs-14 mb-0">SĐT: {user.phoneNumber}</p>
                    <p className="fs-14 mb-0">Địa chỉ: {user.address}</p>
                    <span className="badge badge-soft-info badge-xs rounded-pill mt-1">
                      {user.roleName}
                    </span>
                  </div>
                </div>
                <span className="btn btn-sm" style={{ minWidth: 90 }}>
                  {user.isActive ? "Hoạt động" : "Không hoạt động"}
                </span>
              </div>
            ))
          )}
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
    </div>
  );
};

export default RecentlyAdded;