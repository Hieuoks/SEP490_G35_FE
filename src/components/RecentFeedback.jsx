import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFeedbackAdmin } from "../services/adminService";
import { getFeedbackDetail, deleteFeedback } from "../services/feedbackService";
import AgentSidebar from "./AgentSidebar";
import { Modal, Button } from "react-bootstrap";
const PAGE_SIZE = 10;

const RecentFeedback = () => {
  const location = useLocation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [feedbackDetail, setFeedbackDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Lấy feedbackId từ query param và fetch chi tiết feedback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const feedbackId = params.get("feedbackId");
    if (feedbackId) {
      setSelected(Number(feedbackId));
      fetchFeedbackDetail(feedbackId);
      setShowModal(true);
    }
    // eslint-disable-next-line
  }, [location.search]);

  // Lấy danh sách feedbacks
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

  // Lấy chi tiết feedback
  const fetchFeedbackDetail = async (id) => {
    try {
      const res = await getFeedbackDetail(Number(id));
      setFeedbackDetail(res?.data || null);
    } catch (error) {
      setFeedbackDetail(null);
    }
  };

  // Khi chọn feedback từ danh sách
  const handleSelect = (id) => {
    setSelected(id);
    fetchFeedbackDetail(id);
    setShowModal(true);
    // window.history.replaceState(null, '', `?feedbackId=${id}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    setFeedbackDetail(null);
  };

  // Xóa feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa feedback này?")) return;
    try {
      await deleteFeedback(id);
      setShowModal(false);
      setSelected(null);
      setFeedbackDetail(null);
      // Refresh list
      const res = await getFeedbackAdmin();
      setFeedbacks(res?.data?.feedbacks || []);
    } catch (error) {
      alert("Xóa feedback thất bại!");
    }
  };

  // Format ngày
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN");
  };

  const totalPages = Math.ceil((feedbacks?.length || 0) / PAGE_SIZE);
  const pagedFeedbacks = (feedbacks || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Kiểm tra nếu có feedbackId trên url
  const params = new URLSearchParams(location.search);
  const feedbackIdOnUrl = params.get("feedbackId");

  return (
    <div className="container mt-4">
      <div className="row">
        <AgentSidebar />
        <div className="col-xl-9 col-lg-8">
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
                            onClick={() => handleSelect(fb.ratingId)}
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
            </div>
          </div>
        </div>
      </div>
      {/* Modal chi tiết feedback */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {feedbackDetail ? (
            <div>
              <h5>Feedback #{feedbackDetail.ratingId}</h5>
              <p><b>Tên tour:</b> {feedbackDetail.tourName}</p>
              <p><b>Người đánh giá:</b> {feedbackDetail.userName} ({feedbackDetail.userEmail})</p>
              <p><b>Điểm:</b> <span className="badge bg-success">{feedbackDetail.rating}★</span></p>
              <p><b>Bình luận:</b> {feedbackDetail.comment}</p>
              <p><b>Ngày tạo:</b> {formatDate(feedbackDetail.createdAt)}</p>
              <p><b>Trạng thái:</b> {feedbackDetail.isActive ? "Hiển thị" : "Ẩn"}</p>
              <p>
                <b>Ảnh:</b>{" "}
                {feedbackDetail.mediaUrl ? (
                  <a href={feedbackDetail.mediaUrl} target="_blank" rel="noopener noreferrer">
                    <img src={feedbackDetail.mediaUrl} alt="media" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                  </a>
                ) : (
                  "Không có"
                )}
              </p>
            </div>
          ) : (
            <div className="text-muted">Đang tải chi tiết feedback...</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          {/* Hiện nút xóa nếu feedbackId trên url trùng với feedback đang xem */}
          {feedbackIdOnUrl &&
            feedbackDetail &&
            Number(feedbackIdOnUrl) === feedbackDetail.ratingId && (
              <Button
                variant="danger"
                onClick={() => handleDelete(feedbackDetail.ratingId)}
              >
                Xóa
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecentFeedback;