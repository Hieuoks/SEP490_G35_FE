import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AgentSidebar from "../components/AgentSidebar";
import CustomerSidebar from "../components/CustomerSideBar";
import { getNotification, marksAllRead, marksRead } from '../services/notificationService';
import { Modal, Button } from "react-bootstrap";
import { getFeedbackDetail } from "../services/feedbackService";

const PAGE_SIZE = 5;

const NotificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === "/admin/notifications";
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedbackDetail, setFeedbackDetail] = useState(null);

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotification();
      setNotifications(res?.notifications || []);
    } catch (error) {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    await marksAllRead();
    fetchNotifications();
  };

  // Mark single as read and show modal
  const handleMarkReadAndShow = async (notificationId) => {
    await marksRead(notificationId);
    const res = await getNotification();
    setNotifications(res?.notifications || []);
    const noti = res?.notifications?.find(n => n.notificationId === notificationId);
    setSelected(noti);
    setShowModal(true);
    setFeedbackDetail(null); // reset feedback detail
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    setFeedbackDetail(null);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("vi-VN");
  };

  // Handle "Xử lý vi phạm"
  const handleFeedbackDetail = async () => {
    if (!selected?.relatedEntityId) return;
    try {
      const id = parseInt(selected.relatedEntityId, 10);
      const res = await getFeedbackDetail(id);
      setFeedbackDetail(res);
      // Chuyển sang trang feedback và truyền id (nếu muốn chuyển trang)
      navigate(`/admin/feedback?feedbackId=${id}`);
    } catch (error) {
      setFeedbackDetail(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const pagedNotifications = notifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="content py-4">
      <div className="container">
  <div className="row">
    {/* Sidebar */}
    {isAdmin ? <AgentSidebar /> : <div className="col-xl-3 col-lg-4 mb-4 mb-lg-0"><CustomerSidebar /></div>}
    {/* Main content */}
    <div className="col-xl-9 col-lg-8">
      <div className="card shadow-none mb-0">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
            <h6>Thông báo</h6>
            <div className="d-flex">
              <button
                className="btn btn-light btn-sm d-flex align-items-center me-2"
                onClick={handleMarkAllRead}
                disabled={notifications.every(n => n.isRead)}
              >
                <i className="isax isax-tick-square me-2"></i>Đánh dấu tất cả đã đọc
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div>Đang tải thông báo...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center text-muted py-4">Không có thông báo nào.</div>
          ) : (
            <>
              {pagedNotifications.map((noti, idx) => (
                <div
                  className={`card notification-card${idx === pagedNotifications.length - 1 ? " mb-0" : ""} ${!noti.isRead ? "border-primary" : ""}`}
                  key={noti.notificationId}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMarkReadAndShow(noti.notificationId)}
                >
                  <div className="card-body d-sm-flex align-items-center">
                    <span className={`avatar avatar-lg rounded-circle bg-primary flex-shrink-0 me-sm-3 mb-3 mb-sm-0`}>
                      <i className="isax isax-notification-bing5"></i>
                    </span>
                    <div className="flex-fill">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fs-16 mb-0">{noti.title}</h6>
                      </div>
                      <p className="mb-1">{noti.message}</p>
                      <div className="d-flex align-items-center">
                        <span className="text-gray-9 me-3">{formatDate(noti.createdAt)}</span>
                        {!noti.isRead && (
                          <span className="badge bg-warning text-dark">Chưa đọc</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Pagination */}
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
            </>
          )}
        </div>
      </div>
    </div>
    {/* /Main content */}
  </div>
</div>
      {/* Modal detail notification */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <h5>{selected.title}</h5>
              <p>{selected.message}</p>
              <div className="text-muted mb-2">Thời gian: {formatDate(selected.createdAt)}</div>
              <div>
                <span className="badge bg-info">{selected.type}</span>
                {selected.relatedEntityId && (
                  <span className="ms-2">ID liên quan: {selected.relatedEntityId}</span>
                )}
              </div>
              {/* Nút xử lý vi phạm nếu là Feedback */}
              {isAdmin && selected.relatedEntityId && (
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={handleFeedbackDetail}
                >
                  Xử lý vi phạm
                </Button>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationPage;