import React from "react";

const ratingStats = [
  { label: "5 Star Ratings", percent: 90, count: 247 },
  { label: "4 Star Ratings", percent: 80, count: 145 },
  { label: "3 Star Ratings", percent: 70, count: 600 },
  { label: "2 Star Ratings", percent: 60, count: 560 },
  { label: "1 Star Ratings", percent: 40, count: 400 },
];

const reviews = [
  {
    user: {
      name: "Joseph Massey",
      avatar: "assets/img/users/user-05.jpg",
    },
    date: "2 days ago",
    rating: 5.0,
    title: "Unforgettable Stay!",
    text: "It was a good location however the cocoon concept was weird. No tables, chairs etc was difficult as everything went on the floor.",
    images: [
      {
        thumb: "assets/img/tours/tour-thumb-01.jpg",
        large: "assets/img/tours/tour-large-01.jpg",
      },
      {
        thumb: "assets/img/tours/tour-thumb-02.jpg",
        large: "assets/img/tours/tour-large-02.jpg",
      },
      {
        thumb: "assets/img/tours/tour-thumb-03.jpg",
        large: "assets/img/tours/tour-large-03.jpg",
      },
    ],
    likes: 21,
    dislikes: 50,
    hearts: 45,
    replies: [],
  },
  {
    user: {
      name: "Jeffrey Jones",
      avatar: "assets/img/users/user-21.jpg",
    },
    date: "2 days ago",
    rating: 4.0,
    title: "Excellent service!",
    text: "From the moment we arrived, the staff made us feel welcome. The rooms were immaculate, and every detail was thoughtfully arranged. It was the perfect blend of comfort and luxury!",
    images: [],
    likes: 15,
    dislikes: 30,
    hearts: 52,
    replies: [],
  },
  {
    user: {
      name: "Jessie Alves",
      avatar: "assets/img/users/user-26.jpg",
    },
    date: "2 days ago",
    rating: 5.0,
    title: "Convenient Location!",
    text: "The location was perfect for exploring the city, and the views from our room were breathtaking. It made our trip so much more enjoyable to stay somewhere central and scenic",
    images: [],
    likes: 13,
    dislikes: 38,
    hearts: 75,
    replies: [
      {
        user: {
          name: "Adrian Hendriques",
          avatar: "assets/img/users/user-25.jpg",
        },
        date: "2 days ago",
        rating: 2.0,
        title: "Excellent service!",
        text: "Thank you so much for your kind words! We're thrilled to hear that our location and views made your trip even more enjoyable. We hope to welcome you back soon for another scenic stay!",
        likes: 10,
        dislikes: 21,
        hearts: 46,
      },
    ],
  },
];

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
        <a href="#" className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2">
          <i className="isax isax-repeat me-1"></i>Reply
        </a>
      </div>
      <p className="mb-2">{review.text}</p>
      {review.images && review.images.length > 0 && (
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

function Reviews() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2" id="reviews">
        <h6 className="mb-3">Reviews (45)</h6>
        <a href="#" className="btn btn-primary btn-md mb-3">
          <i className="isax isax-edit-2 me-1"></i>Write a Review
        </a>
      </div>
      <div className="row">
        <div className="col-md-6 d-flex">
          <div className="rating-item bg-light-200 text-center flex-fill mb-3">
            <h6 className="fw-medium mb-3">Customer Reviews & Ratings</h6>
            <h5 className="display-6">4.9 / 5.0</h5>
            <div className="d-inline-flex align-items-center justify-content-center mb-3">
              <i className="ti ti-star-filled text-primary me-1"></i>
              <i className="ti ti-star-filled text-primary me-1"></i>
              <i className="ti ti-star-filled text-primary me-1"></i>
              <i className="ti ti-star-filled text-primary me-1"></i>
              <i className="ti ti-star-filled text-primary"></i>
            </div>
            <p>Based On 2,459 Reviews</p>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card rating-progress shadow-none flex-fill mb-3">
            <div className="card-body">
              {ratingStats.map((stat, idx) => (
                <div className={`d-flex align-items-center${idx < ratingStats.length - 1 ? " mb-2" : ""}`} key={idx}>
                  <p className="me-2 text-nowrap mb-0">{stat.label}</p>
                  <div
                    className="progress w-100"
                    role="progressbar"
                    aria-valuenow={stat.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div className="progress-bar bg-primary" style={{ width: `${stat.percent}%` }}></div>
                  </div>
                  <p className="progress-count ms-2">{stat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {reviews.map((review, idx) => (
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
          See all 4,078 reviews<i className="isax isax-arrow-right-3 ms-1"></i>
        </a>
      </div>
    </div>
  );
}

export default Reviews;