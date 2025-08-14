import React, { useState, useEffect } from "react";
import { getFeedbackAdmin } from "../services/adminService";
const PAGE_SIZE = 5;

const RecentFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await getFeedbackAdmin();
        setFeedbacks(res?.data?.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Format ngày
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN");
  };

  const totalPages = Math.ceil((feedbacks?.length || 0) / PAGE_SIZE);
  const pagedFeedbacks = (feedbacks || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="card mb-0">
      <div className="card-body p-0">
        <h6 className="mb-3">Feedback gần đây</h6>
        <div className="table-responsive">
          <table className="table datatable">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Tên tour</th>
                <th>Người đánh giá</th>
                <th>Email</th>
                <th>Điểm</th>
                <th>Bình luận</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Ảnh</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pagedFeedbacks.map((fb) => (
                <tr key={fb.ratingId}>
                  <td>{fb.ratingId}</td>
                  <td>{fb.tourName}</td>
                  <td>{fb.userName}</td>
                  <td>{fb.userEmail}</td>
                  <td>
                    <span className="badge bg-success">{fb.rating}★</span>
                  </td>
                  <td>{fb.comment}</td>
                  <td>{formatDate(fb.createdAt)}</td>
                  <td>
                    <span className={`badge ${fb.isActive ? "badge-info" : "badge-secondary"} rounded-pill`}>
                      {fb.isActive ? "Hiển thị" : "Ẩn"}
                    </span>
                  </td>
                  <td>
                    {fb.mediaUrl ? (
                      <a href={fb.mediaUrl} target="_blank" rel="noopener noreferrer">
                        <img src={fb.mediaUrl} alt="media" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
                      </a>
                    ) : (
                      <span className="text-muted">Không có</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setSelected(fb.ratingId)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
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

        {/* Chi tiết feedback */}
        {selected && (
          <div className="mt-4 border rounded p-3 bg-light">
            <button className="btn btn-sm btn-danger float-end" onClick={() => setSelected(null)}>Đóng</button>
            {(() => {
              const fb = (feedbacks || []).find(x => x.ratingId === selected);
              if (!fb) return null;
              return (
                <div>
                  <h5>Chi tiết feedback #{fb.ratingId}</h5>
                  <p><b>Tên tour:</b> {fb.tourName}</p>
                  <p><b>Người đánh giá:</b> {fb.userName} ({fb.userEmail})</p>
                  <p><b>Điểm:</b> <span className="badge bg-success">{fb.rating}★</span></p>
                  <p><b>Bình luận:</b> {fb.comment}</p>
                  <p><b>Ngày tạo:</b> {formatDate(fb.createdAt)}</p>
                  <p><b>Trạng thái:</b> {fb.isActive ? "Hiển thị" : "Ẩn"}</p>
                  <p>
                    <b>Ảnh:</b>{" "}
                    {fb.mediaUrl ? (
                      <a href={fb.mediaUrl} target="_blank" rel="noopener noreferrer">
                        <img src={fb.mediaUrl} alt="media" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                      </a>
                    ) : (
                      "Không có"
                    )}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFeedback;