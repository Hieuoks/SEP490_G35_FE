import React ,{useState}from "react";
import ReviewModal from "./ReviewModal";
import { createFeedback } from "../services/feedbackService";
// Hàm xử lý dữ liệu từ tour.tourRatings để hiển thị
import { toast } from "react-toastify";
const mapTourRatingsToReviews = (tourRatings) => {
  if (!Array.isArray(tourRatings)) return [];

  return tourRatings.map((r) => ({
    user: {
      name: r.tourRating_Username || "Ẩn danh",
      avatar: "https://via.placeholder.com/40", // bạn có thể sửa lại nếu có avatar user
    },
    date: new Date(r.createdAt).toLocaleDateString(),
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
  }));
};

// Component con hiển thị mỗi review
function ReviewItem({ review, isReply }) {
  return (
    <div className={`review-info${isReply ? " reply mt-4 p-3" : ""}`}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center mb-2">
          <span className="avatar avatar-lg me-2 flex-shrink-0">
            <img src={review.user.avatar} className="rounded-circle" alt="img" />
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
        
      </div>
      <p className="mb-2">{review.text}</p>
      {review.images?.length > 0 && (
        <div className="d-flex align-items-center">
          {review.images.map((img, idx) => (
            <div
              className={`avatar avatar-md me-${idx < review.images.length - 1 ? 2 : 0} mb-2`}
              data-fancybox="gallery"
              href={img.large}
              key={idx}
            >
              <img src={img.thumb} className="br-10" alt="img" />
            </div>
          ))}
        </div>
      )}
      <div className="d-inline-flex align-items-center">
        <a href="#" className="d-inline-flex align-items-center fs-14 me-3">
          <i className="isax isax-like-1 me-2"></i>{review.likes}
        </a>
        <a href="#" className="d-inline-flex align-items-center me-3">
          <i className="isax isax-dislike me-2"></i>{review.dislikes}
        </a>
        <a href="#" className="d-inline-flex align-items-center me-3">
          <i className="isax isax-heart5 text-danger me-2"></i>{review.hearts}
        </a>
      </div>
    </div>
  );
}

function Reviews({ tour }) {
const [reviewList, setReviewList] = useState(mapTourRatingsToReviews(tour?.tourRatings || []));

  const [totalRatings,setTotalRatings] = useState(reviewList.length);
  const averageRating = tour?.averageRating?.toFixed(1) || "0.0";
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

const handleSubmitReview = async (reviewData) => {
  try {
    const result = await createFeedback(reviewData);
    const res = result?.data;

    if (!res || !res.data) {
      throw new Error("Dữ liệu phản hồi không hợp lệ");
    }

    const newReview = {
      user: {
        name: res.data.userName || "Ẩn danh",
        avatar: "https://via.placeholder.com/40",
      },
      date: new Date(res.data.createdAt).toLocaleDateString(),
      rating: res.data.rating,
      title: res.data.comment?.slice(0, 30) || "Đánh giá",
      text: res.data.comment || "",
      images: res.data.mediaUrl && res.data.mediaUrl !== "string"
        ? [
            {
              thumb: res.data.mediaUrl,
              large: res.data.mediaUrl,
            },
          ]
        : [],
      likes: 0,
      dislikes: 0,
      hearts: 0,
      replies: [],
    };

    // Cập nhật danh sách đánh giá ngay lập tức
    setReviewList((prev) => [newReview, ...prev]);
setTotalRatings((prev) => prev + 1);
    toast.success("Đánh giá của bạn đã được gửi!");
    setIsModalOpen(false);
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    toast.error("Không thể gửi đánh giá. Vui lòng thử lại sau.");
  }
};


  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2" id="reviews">
        <h6 className="mb-3">Reviews ({tour?.reviews?.length || 0})</h6>
        <button className="btn btn-primary btn-md mb-3" onClick={handleOpenModal}>
          <i className="isax isax-edit-2 me-1"></i>Viết đánh giá
        </button>
      </div>

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
              <p className="text-muted">* Chức năng thống kê chi tiết chưa được hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      {reviewList.map((review, idx) => (
        <div className="card review-item shadow-none mb-3" key={idx}>
          <div className="card-body p-3">
            <ReviewItem review={review} />
            {review.replies &&
              review.replies.map((reply, ridx) => (
                <ReviewItem review={reply} isReply={true} key={ridx} />
              ))}
          </div>
        </div>
      ))}

      <div className="text-center mb-4 mb-xl-0">
        <a href="#" className="btn btn-primary btn-md d-inline-flex align-items-center justify-content-center mt-2">
          Xem tất cả đánh giá<i className="isax isax-arrow-right-3 ms-1"></i>
        </a>
      </div>
      <ReviewModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitReview} id={tour?.tourId}/>
    </div>
  );
}

export default Reviews;
