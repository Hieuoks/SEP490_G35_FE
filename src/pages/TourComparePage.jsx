import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaCrown, FaEquals, FaStar, FaBus, FaPlane, FaTrain, FaBuilding, FaSearch } from "react-icons/fa";
import { getTourDetail, getTour, compareTour } from "../services/tourService";
import { useParams } from "react-router-dom";

const getTransportIcon = (type) => {
  switch (type) {
    case "Xe bus":
      return <FaBus />;
    case "Máy bay":
      return <FaPlane />;
    case "Tàu hỏa":
      return <FaTrain />;
    default:
      return <FaBus />;
  }
};

const TourComparePage = () => {
  const { id } = useParams();
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [compareTourObj, setCompareTourObj] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Search & filter state
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [transportFilter, setTransportFilter] = useState("");

  // Lấy danh sách tour
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const tourList = await getTour();
        setTours(tourList.data);
      } catch (err) {
        setTours([]);
      }
    };
    fetchTours();
  }, []);

  // Lấy thông tin tour đầu tiên từ id trên url
  useEffect(() => {
    const fetchSelectedTour = async () => {
      if (id) {
        try {
          const tour = await getTourDetail(id);
          setSelectedTour(tour);
        } catch (err) {
          setSelectedTour(null);
        }
      }
    };
    fetchSelectedTour();
  }, [id]);

  // Hàm so sánh 2 tour
  const handleCompare = async (tour) => {
    setCompareTourObj(tour);
    if (selectedTour && tour) {
      try {
        const result = await compareTour(selectedTour.tourId, tour.tourId);
        setCompareData(result);
        setShowModal(true);
      } catch (err) {
        setCompareData(null);
        setShowModal(false);
        alert("Không thể so sánh tour!");
      }
    }
  };

  // Lọc danh sách tour
  const filteredTours = tours
    .filter(t => t.tourId !== selectedTour?.tourId)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => {
      if (!priceFilter) return true;
      if (priceFilter === "1") return t.priceOfAdults < 1000000;
      if (priceFilter === "2") return t.priceOfAdults >= 1000000 && t.priceOfAdults <= 1200000;
      if (priceFilter === "3") return t.priceOfAdults > 1200000;
      return true;
    })
    .filter(t => {
      if (!transportFilter) return true;
      return t.transportation === transportFilter;
    });

  // Lấy danh sách phương tiện duy nhất
  const transportOptions = Array.from(new Set(tours.map(t => t.transportation))).filter(Boolean);

  if (!selectedTour) return <div>Đang tải...</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">So sánh Tour Du Lịch</h3>
      <div className="row">
        {/* Left: Selected Tour */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{selectedTour.title}</h5>
            </div>
            <div className="card-body">
              <p><b>Mô tả:</b> {selectedTour.description}</p>
              <p><b>Giá người lớn:</b> {selectedTour.priceOfAdults?.toLocaleString()} VNĐ</p>
              <p><b>Giá trẻ em:</b> {selectedTour.priceOfChildren?.toLocaleString()} VNĐ</p>
              <p><b>Giá trẻ sơ sinh:</b> {selectedTour.priceOfInfants?.toLocaleString()} VNĐ</p>
              <p><b>Thời lượng:</b> {selectedTour.durationInDays} ngày</p>
              <p><b>Điểm xuất phát:</b> {selectedTour.startPoint}</p>
              <p><b>Phương tiện:</b> {getTransportIcon(selectedTour.transportation)} {selectedTour.transportation}</p>
              <p><b>Đánh giá trung bình:</b> {selectedTour.averageRating ?? "Chưa có"} <FaStar className="text-warning" /></p>
              <p><b>Đơn vị tổ chức:</b> <FaBuilding /> {selectedTour.companyName}</p>
              <Button variant="success" onClick={() => setShowModal(true)}>
                So sánh với tour khác
              </Button>
            </div>
          </div>
        </div>
        {/* Right: List Tour */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Chọn tour để so sánh</h5>
            </div>
            <div className="card-body" style={{ maxHeight: 500, overflowY: "auto" }}>
              {/* Search & filter */}
              <InputGroup className="mb-2">
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên tour..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>
              <div className="d-flex mb-2 gap-2">
                <Form.Select
                  value={priceFilter}
                  onChange={e => setPriceFilter(e.target.value)}
                  style={{ maxWidth: 180 }}
                >
                  <option value="">Lọc theo giá</option>
                  <option value="1">Dưới 1.000.000 VNĐ</option>
                  <option value="2">1.000.000 - 1.200.000 VNĐ</option>
                  <option value="3">Trên 1.200.000 VNĐ</option>
                </Form.Select>
                <Form.Select
                  value={transportFilter}
                  onChange={e => setTransportFilter(e.target.value)}
                  style={{ maxWidth: 180 }}
                >
                  <option value="">Lọc theo phương tiện</option>
                  {transportOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Form.Select>
              </div>
              {/* Danh sách tour */}
              {filteredTours.length === 0 && (
                <div className="text-muted text-center py-3">Không có tour phù hợp</div>
              )}
              {filteredTours.map(tour => (
                <div key={tour.tourId} className="border-bottom py-2 d-flex align-items-center justify-content-between">
                  <div>
                    <b>{tour.title}</b> <span className="text-muted">({tour.durationInDays} ngày)</span>
                    <div>
                      <span>Giá: {tour.priceOfAdults?.toLocaleString()} VNĐ</span>
                      <span className="ms-2">{getTransportIcon(tour.transportation)} {tour.transportation}</span>
                    </div>
                  </div>
                  <Button variant="outline-primary" size="sm" onClick={() => handleCompare(tour)}>
                    So sánh
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal So Sánh */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>So sánh Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {compareData ? (
            <>
              {/* Thông tin 2 tour đặt cạnh nhau */}
              <div className="row mb-3">
                {/* Tour 1 */}
                <div className="col-md-6 border-end">
                  <h5 className="text-primary">{compareData.tour1.title}</h5>
                  <p>{compareData.tour1.description}</p>
                  <ul className="list-unstyled">
                    <li><b>Giá người lớn:</b> {compareData.tour1.priceOfAdults?.toLocaleString()} VNĐ</li>
                    <li><b>Thời lượng:</b> {compareData.tour1.durationInDays} ngày</li>
                    <li><b>Tỷ lệ đặt chỗ:</b> {compareData.tour1.occupancyRate} %</li>
                    <li><b>Điểm đánh giá:</b> {compareData.tour1.averageRating} <FaStar className="text-warning" /></li>
                    <li><b>Số lượng đánh giá:</b> {compareData.tour1.totalRatings}</li>
                    <li><b>Phương tiện:</b> {getTransportIcon(compareData.tour1.transportation)} {compareData.tour1.transportation}</li>
                    <li><b>Đơn vị tổ chức:</b> {compareData.tour1.companyName}</li>
                  </ul>
                </div>
                {/* Tour 2 */}
                <div className="col-md-6">
                  <h5 className="text-success">{compareData.tour2.title}</h5>
                  <p>{compareData.tour2.description}</p>
                  <ul className="list-unstyled">
                    <li><b>Giá người lớn:</b> {compareData.tour2.priceOfAdults?.toLocaleString()} VNĐ</li>
                    <li><b>Thời lượng:</b> {compareData.tour2.durationInDays} ngày</li>
                    <li><b>Tỷ lệ đặt chỗ:</b> {compareData.tour2.occupancyRate} %</li>
                    <li><b>Điểm đánh giá:</b> {compareData.tour2.averageRating} <FaStar className="text-warning" /></li>
                    <li><b>Số lượng đánh giá:</b> {compareData.tour2.totalRatings}</li>
                    <li><b>Phương tiện:</b> {getTransportIcon(compareData.tour2.transportation)} {compareData.tour2.transportation}</li>
                    <li><b>Đơn vị tổ chức:</b> {compareData.tour2.companyName}</li>
                  </ul>
                </div>
              </div>
              {/* Kết quả so sánh */}
              <div className="row">
                <div className="col-12 text-center mb-2">
                  <FaCrown className="text-warning" size={32} />
                  <div className="my-2">
                    <b>{compareData.result.winner}</b>
                  </div>
                </div>
                <div className="col-12">
                  <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                    {compareData.result.criterionComparisons.map((c, idx) => (
                      <li key={idx} className="mb-2 mx-3">
                        {c.winner === "Tour1" && <FaCrown className="text-primary me-1" title="Tour 1 thắng" />}
                        {c.winner === "Tour2" && <FaCrown className="text-danger me-1" title="Tour 2 thắng" />}
                        {c.winner === "Tie" && <FaEquals className="text-secondary me-1" title="Hòa" />}
                        <span>{c.criterionName}: </span>
                        <span className="ms-1">{c.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div>Đang tải dữ liệu so sánh...</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourComparePage;