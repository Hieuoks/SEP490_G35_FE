import React, { useState } from "react";
import ReviewModal from "./ReviewModal";
import { createFeedback, deleteFeedback, updateFeedback, getFeedbackDetail, reportFeedback } from "../services/feedbackService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { uploadToCloudinary } from "../services/imgUploadService";

// Lấy userId từ Cookies
const getUserIdFromCookies = () => {
  const match = document.cookie.match(/(?:^|; )userId=([^;]*)/);
  return match ? match[1] : null;
};

const mapTourRatingsToReviews = (tourRatings) => {
  if (!Array.isArray(tourRatings)) return [];
  // Chỉ lấy feedback có isActive === true
  return tourRatings
    .filter((r) => r.isActive === true)
    .map((r) => ({
      user: {
        name: r.tourRating_Username || "Ẩn danh",
        avatar:
          r.avatar && r.avatar !== "string"
            ? r.avatar
            : "https://via.placeholder.com/40",
        userId: r.userId,
        ratingId: r.ratingId,
      },
      date: new Date(r.createdAt).toLocaleDateString(),
      createdAt: r.createdAt,
      rating: r.rating,
      title: r.comment?.slice(0, 30) || "Đánh giá",
      text: r.comment || "",
      images: r.mediaUrl
        ? [
            {
              thumb: r.mediaUrl,
              large: r.mediaUrl,
            },
          ]
        : [],
      likes: 0,
      dislikes: 0,
      hearts: 0,
      replies: [],
      raw: r,
    }));
};

const REPORT_REASONS = [
  "Nội dung không phù hợp",
  "Ngôn từ thô tục",
  "Spam hoặc quảng cáo",
  "Thông tin sai sự thật",
  "Khác",
];

function ReportModal({ open, onClose, onSubmit, reasons, setReasons }) {
  const handleCheckboxChange = (reason) => {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = () => {
    if (reasons.length === 0) {
      toast.error("Vui lòng chọn ít nhất một lý do!");
      return;
    }
    onSubmit(reasons);
  };

  if (!open) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Báo cáo đánh giá</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Chọn lý do bạn muốn báo cáo (có thể chọn nhiều):</p>
            {REPORT_REASONS.map((reason, idx) => (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`reason-${idx}`}
                  checked={reasons.includes(reason)}
                  onChange={() => handleCheckboxChange(reason)}
                />
                <label className="form-check-label" htmlFor={`reason-${idx}`}>
                  {reason}
                </label>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <button type="button" className="btn btn-danger" onClick={handleSubmit}>
              Gửi báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ review, isReply, onEdit, onDelete, canEdit, onReport, onImageClick }) {
  return (
    <div className={`review-info${isReply ? " reply mt-4 p-3" : ""}`}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center mb-2">
          <span className="avatar avatar-lg me-2 flex-shrink-0">
            <img src={review.user.avatar||"https://ui-avatars.com/api/?name=" + review.user.tourRating_Username} className="rounded-circle" alt="avatar" />
          </span>
          <div>
            <h6 className="fs-16 fw-medium mb-1">{review.user.name}</h6>
            <div className="d-flex align-items-center flex-wrap date-info">
              <p className="fs-14 mb-0">{review.date}</p>
              <p className="fs-14 d-inline-flex align-items-center mb-0">
                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">{review.rating}</span>
                {review.title}
              </p>
            </div>
          </div>
        </div>
        {canEdit ? (
          <div>
            <select
              className="form-select form-select-sm"
              style={{ width: 120, display: "inline-block" }}
              onChange={async (e) => {
                if (e.target.value === "edit") {
                  try {
                    const res = await getFeedbackDetail(review.user.ratingId);
                    onEdit(res.data);
                  } catch (error) {
                    toast.error("Không thể lấy thông tin đánh giá!");
                  }
                }
                if (e.target.value === "delete") onDelete(review);
                e.target.value = "";
              }}
              defaultValue=""
            >
              <option value="" disabled>Chọn thao tác</option>
              <option value="edit">Cập nhật</option>
              <option value="delete">Xóa</option>
            </select>
          </div>
        ) : (
          <button className="btn btn-outline-danger btn-sm" onClick={() => onReport(review)}>
            Báo cáo
          </button>
        )}
      </div>
      <p className="mb-2">{review.text}</p>
      {review.images?.length > 0 && (
        <div className="d-flex align-items-center">
          {review.images.map((img, idx) => (
            <div
              className={`avatar avatar-md me-${idx < review.images.length - 1 ? 2 : 0} mb-2`}
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={() => onImageClick(img.large)}
            >
              <img src={img.thumb} className="br-10" alt="img" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Reviews({ tour }) {
  const userId = getUserIdFromCookies();
  let reviewList = mapTourRatingsToReviews(tour?.tourRatings);

  // Sắp xếp reviewList mới nhất lên đầu
  reviewList = reviewList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Thống kê số lượng đánh giá theo từng mức sao
  const ratingStats = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviewList.filter(r => r.rating === star).length,
    percent: reviewList.length ? (reviewList.filter(r => r.rating === star).length / reviewList.length * 100).toFixed(0) : 0
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);
  const paginatedReviews = reviewList.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

  const [totalRatings] = useState(reviewList.length);
  const averageRating = tour?.averageRating?.toFixed(1) || "0.0";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReasons, setReportReasons] = useState([]);
  const [reportReview, setReportReview] = useState(null);

  // Fancybox state
  const [fancyOpen, setFancyOpen] = useState(false);
  const [fancyImg, setFancyImg] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditReview(null);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      if (editReview) {
        // UPDATE: upload ảnh nếu có, gửi object thường
        let dataToSend = { ...reviewData };
        if (reviewData.mediaFile) {
          const uploadRes = await uploadToCloudinary(reviewData.mediaFile);
          dataToSend.mediaUrl = uploadRes.secure_url;
          delete dataToSend.mediaFile;
        }
        await updateFeedback(editReview.ratingId, dataToSend);
        toast.success("Cập nhật đánh giá thành công!");
      } else {
        // CREATE: gửi FormData đúng trường cho backend
        const formData = new FormData();
        formData.append("TourId", tour.tourId); // lấy đúng id tour
        formData.append("Rating", reviewData.rating);
        formData.append("Comment", reviewData.comment);
        if (reviewData.mediaFile) {
          formData.append("ImageFile", reviewData.mediaFile);
        }
        await createFeedback(formData);
        toast.success("Đánh giá của bạn đã được gửi!");
      }
      setIsModalOpen(false);
      setEditReview(null);
    } catch (error) {
      toast.error("Không thể gửi đánh giá. Vui lòng thử lại sau.");
    }
  };
  const handleEditReview = (reviewDetail) => {
    setEditReview(reviewDetail);
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (review) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      try {
        await deleteFeedback(review.user.ratingId);
        toast.success("Xóa đánh giá thành công!");
      } catch (error) {
        toast.error("Không thể xóa đánh giá. Vui lòng thử lại sau.");
      }
    }
  };

  // Report logic
  const handleReportReview = (review) => {
    setReportReview(review);
    setReportReasons([]);
    setReportModalOpen(true);
  };

  const handleSubmitReport = async (reasons) => {
    if (!reportReview) return;
    try {
      await reportFeedback({
        ratingId: reportReview.user.ratingId,
        reason: reasons.join(", "),
      });
      toast.success("Báo cáo đã được gửi!");
      setReportModalOpen(false);
      setReportReview(null);
      setReportReasons([]);
    } catch (error) {
      toast.error("Không thể gửi báo cáo. Vui lòng thử lại sau.");
    }
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
    setReportReview(null);
    setReportReasons([]);
  };

  // Fancybox logic
  const handleImageClick = (imgUrl) => {
    setFancyImg(imgUrl);
    setFancyOpen(true);
  };

  const handleCloseFancy = () => {
    setFancyOpen(false);
    setFancyImg(null);
  };

  // Lấy danh sách tất cả ảnh trong feedback để chuyển ảnh khi phóng to
  const allImages = reviewList.flatMap(r => r.images.map(img => img.large));
  const currentImgIdx = allImages.findIndex(url => url === fancyImg);

  const handlePrevFancy = (e) => {
    e.stopPropagation();
    if (allImages.length === 0) return;
    setFancyImg(allImages[(currentImgIdx - 1 + allImages.length) % allImages.length]);
  };

  const handleNextFancy = (e) => {
    e.stopPropagation();
    if (allImages.length === 0) return;
    setFancyImg(allImages[(currentImgIdx + 1) % allImages.length]);
  };

  return (
    <div>
      {/* Fancybox overlay */}
      {fancyOpen && (
        <div
          className="fancybox-overlay"
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleCloseFancy}
        >
          <button
            style={{
              position: "absolute",
              top: 30,
              right: 40,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
              zIndex: 10001,
            }}
            onClick={handleCloseFancy}
            aria-label="Đóng"
            type="button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button
            style={{
              position: "absolute",
              left: 30,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 40,
              cursor: "pointer",
              zIndex: 10001,
            }}
            onClick={handlePrevFancy}
            aria-label="Trước"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <img
            src={fancyImg}
            alt="Feedback"
            style={{
              maxHeight: "80vh",
              maxWidth: "90vw",
              borderRadius: 12,
              boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
              objectFit: "contain",
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            style={{
              position: "absolute",
              right: 30,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 40,
              cursor: "pointer",
              zIndex: 10001,
            }}
            onClick={handleNextFancy}
            aria-label="Sau"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2" id="reviews">
        <h6 className="mb-3">Đánh giá ({reviewList.length})</h6>
        <button className="btn btn-primary btn-md mb-3" onClick={handleOpenModal}>
          <i className="isax isax-edit-2 me-1"></i>Viết đánh giá
        </button>
      </div>

      {/* Thống kê đánh giá */}
      <div className="row">
        <div className="col-md-6 d-flex">
          <div className="rating-item bg-light-200 text-center flex-fill mb-3">
            <h6 className="fw-medium mb-3">Đánh giá từ khách hàng</h6>
            <h5 className="display-6">{averageRating} / 5.0</h5>
            <div className="d-inline-flex align-items-center justify-content-center mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`ti ti-star-filled ${i < Math.round(averageRating) ? "text-primary" : "text-muted"} me-1`}
                ></i>
              ))}
            </div>
            <p>Dựa trên {totalRatings} đánh giá</p>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card rating-progress shadow-none flex-fill mb-3">
            <div className="card-body">
              {ratingStats.map(stat => (
                <div className="d-flex align-items-center mb-2" key={stat.star}>
                  <span className="me-2">{stat.star} <i className="ti ti-star-filled text-warning"></i></span>
                  <div className="progress flex-grow-1 me-2" style={{ height: 8 }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${stat.percent}%` }}
                      aria-valuenow={stat.count}
                      aria-valuemin={0}
                      aria-valuemax={reviewList.length}
                    ></div>
                  </div>
                  <span className="text-muted" style={{ minWidth: 30 }}>{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách đánh giá phân trang */}
      {paginatedReviews.map((review, idx) => (
        <div className="card review-item shadow-none mb-3" key={idx}>
          <div className="card-body p-3">
            <ReviewItem
              review={review}
              canEdit={userId && String(userId) === String(review.user.userId)}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
              onReport={handleReportReview}
              onImageClick={handleImageClick}
            />
            {review.replies &&
              review.replies.map((reply, ridx) => (
                <ReviewItem review={reply} isReply={true} key={ridx} onImageClick={handleImageClick} />
              ))}
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mb-4">
          <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Trước
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item${currentPage === i + 1 ? " active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Tiếp
              </button>
            </li>
          </ul>
        </nav>
      )}

      <ReviewModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        id={tour?.tourId}
        editData={editReview}
      />
      <ReportModal
        open={reportModalOpen}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitReport}
        reasons={reportReasons}
        setReasons={setReportReasons}
      />
    </div>
  );
}

export default Reviews;