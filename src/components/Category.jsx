import React, { useRef } from "react";

const destinations = [
  {
    name: "Bắc",
    img: "assets/img/destination/destination-01.jpg",
    reviews: 452,
    flights: 21,
    hotels: 15,
    cruises: 6,
    rating: 5,
    link: "destination.html",
  },
  {
    name: "Trung",
    img: "assets/img/destination/destination-02.jpg",
    reviews: 320,
    flights: 18,
    hotels: 12,
    cruises: 4,
    rating: 5,
    link: "destination.html",
  },
  {
    name: "Nam",
    img: "assets/img/destination/destination-03.jpg",
    reviews: 510,
    flights: 25,
    hotels: 20,
    cruises: 8,
    rating: 5,
    link: "destination.html",
  },
];

const scrollAmount = 540;

const DestinationSection = () => {
  const listRef = useRef(null);

  const handleScroll = (dir) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: dir === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section destination-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-10 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-2">
                Tìm kiếm theo <span className="text-primary text-decoration-underline">Điểm đến</span> trên toàn thế giới
              </h2>
              <p className="sub-title">
                DreamsTour Marketplace là nền tảng kết nối người dùng với những trải nghiệm độc quyền liên quan đến các tour du lịch cụ thể
              </p>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <button
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
            style={{ zIndex: 2, left: -30 }}
            onClick={() => handleScroll("left")}
            aria-label="Trước"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div
            className="d-flex justify-content-center gap-5 flex-nowrap"
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              boxShadow: "none",
              border: "none",
              background: "transparent",
            }}
            ref={listRef}
          >
            {destinations.map((d, idx) => (
              <div
                className="destination-item mb-2 wow fadeInUp"
                data-wow-delay="0.2s"
                key={idx}
                style={{
                  minWidth: 480,
                  maxWidth: 520,
                  flex: "0 0 auto",
                  fontSize: 30,
                  padding: 28,
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                }}
              >
                <img
                  src={d.img}
                  alt="img"
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                />
                <div className="destination-info text-center">
                  <div className="destination-content">
                    <h5 className="mb-1 text-white" style={{ fontSize: 40 }}>{d.name}</h5>
                    
                  </div>
                  
                </div>
                
              </div>
            ))}
          </div>
          <button
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
            style={{ zIndex: 2, right: -30 }}
            onClick={() => handleScroll("right")}
            aria-label="Sau"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default DestinationSection;