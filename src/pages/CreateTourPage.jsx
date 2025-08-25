import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTour } from "../services/tourService";
import { message, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
const initialState = {
  title: "",
  description: "",
  priceOfAdults: "",
  priceOfChildren: "",
  priceOfInfants: "",
  durationInDays: "",
  startPoint: "",
  transportation: "",
  maxSlots: "",
  minSlots: "",
  note: "",
  isActive: true,
  TourOperatorId: Cookies.get("operatorId") || 1,
  departureDates: [{ departureDate1: "" }],
  tourExperiences: [{ content: "" }],
  tourItineraries: [],
  tourMedia: [{ mediaFile: null, mediaType: "", mediaUrl: "" }],
  TourAvatarFile: null,
};

function CreateTourPage() {
  const startPoints = [
  "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Lâm Đồng", "Cà Mau", "Cần Thơ",
  "Khánh Hòa", "Đắk Lắk", "TP. Hồ Chí Minh", "Vĩnh Long", "Sơn La", "Quảng Ninh", "TP. Hải Phòng", "TP. Huế",
  "TP. Đà Nẵng", "Hà Tĩnh", "Cao Bằng", "Lai Châu", "Điện Biên", "Lạng Sơn", "Bắc Giang", "Quảng Bình",
  "Quảng Trị", "Thừa Thiên Huế", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Gia Lai", "Kon Tum", "Ninh Thuận", "Bình Thuận","TP. Hà Nội"
];
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [itineraryEditIdx, setItineraryEditIdx] = useState(null);
  const [itineraryForm, setItineraryForm] = useState({
    dayNumber: "",
    title: "",
    description: "",
    itineraryMedia: [{ mediaFile: null, mediaType: "", caption: "" }]
  });
  const [apiErrors, setApiErrors] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const days = parseInt(form.durationInDays) || 0;
    if (days > 0) {
      setForm((prev) => {
        if (prev.tourItineraries.length < days) {
          const newItineraries = [...prev.tourItineraries];
          for (let i = prev.tourItineraries.length; i < days; i++) {
            newItineraries.push({
              dayNumber: i + 1,
              title: "",
              description: "",
              itineraryMedia: [{ mediaFile: null, mediaType: "", caption: "" }]
            });
          }
          return { ...prev, tourItineraries: newItineraries };
        }
        if (prev.tourItineraries.length > days) {
          return { ...prev, tourItineraries: prev.tourItineraries.slice(0, days) };
        }
        return prev;
      });
    }
  }, [form.durationInDays]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleTourMediaFileChange = (idx, file) => {
    setForm((prev) => ({
      ...prev,
      tourMedia: prev.tourMedia.map((item, i) =>
        i === idx ? { ...item, mediaFile: file } : item
      ),
    }));
  };

  const handleAvatarChange = (e) => {
    setForm((prev) => ({
      ...prev,
      TourAvatarFile: e.target.files[0] || null,
    }));
  };

  const addArrayField = (field, newItem) => {
    
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem],
    }));
  };
  const removeArrayField = (field, idx) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }));
  };

  const openItineraryModal = (idx = null) => {
    setItineraryEditIdx(idx);
    if (idx !== null) {
      setItineraryForm({ ...form.tourItineraries[idx] });
    } else {
      setItineraryForm({
        dayNumber: "",
        title: "",
        description: "",
        itineraryMedia: [{ mediaFile: null, mediaType: "", caption: "" }]
      });
    }
    setShowItineraryModal(true);
  };

  const closeItineraryModal = () => {
    setShowItineraryModal(false);
    setItineraryEditIdx(null);
    setItineraryForm({
      dayNumber: "",
      title: "",
      description: "",
      itineraryMedia: [{ mediaFile: null, mediaType: "", caption: "" }]
    });
  };

  const handleItineraryFormChange = (e) => {
    const { name, value } = e.target;
    setItineraryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItineraryMediaChange = (mediaIdx, key, value) => {
    setItineraryForm((prev) => ({
      ...prev,
      itineraryMedia: prev.itineraryMedia.map((media, idx) =>
        idx === mediaIdx ? { ...media, [key]: value } : media
      ),
    }));
  };

  const handleItineraryMediaFileChange = (mediaIdx, file) => {
    setItineraryForm((prev) => ({
      ...prev,
      itineraryMedia: prev.itineraryMedia.map((media, idx) =>
        idx === mediaIdx ? { ...media, mediaFile: file } : media
      ),
    }));
  };

  const addItineraryMedia = () => {
    setItineraryForm((prev) => ({
      ...prev,
      itineraryMedia: [...prev.itineraryMedia, { mediaFile: null, mediaType: "", caption: "" }]
    }));
  };

  const removeItineraryMedia = (mediaIdx) => {
    setItineraryForm((prev) => ({
      ...prev,
      itineraryMedia: prev.itineraryMedia.filter((_, idx) => idx !== mediaIdx)
    }));
  };

  const saveItinerary = () => {
    if (itineraryEditIdx !== null) {
      setForm((prev) => ({
        ...prev,
        tourItineraries: prev.tourItineraries.map((item, idx) =>
          idx === itineraryEditIdx ? itineraryForm : item
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        tourItineraries: [...prev.tourItineraries, itineraryForm],
      }));
    }
    closeItineraryModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.priceOfAdults) newErrors.priceOfAdults = "Price is required";
    if (!form.priceOfChildren) newErrors.priceOfChildren = "Price is required";
    if (!form.priceOfInfants) newErrors.priceOfChildren = "Price is required";
    if (!form.startPoint) newErrors.startPoint = "Start Point is required";
    if (!form.transportation) newErrors.transportation = "Transportation is required";
    if (!form.maxSlots) newErrors.maxSlots = "Max Slots is required";
    if (!form.minSlots) newErrors.minSlots = "Min Slots is required";
    if (!form.TourAvatarFile) newErrors.TourAvatarFile = "Tour avatar is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }

    let data = new FormData();
    data.append('Title', form.title);
    data.append('Description', form.description);
    data.append('PriceOfAdults', form.priceOfAdults);
    data.append('PriceOfChildren', form.priceOfChildren);
    data.append('PriceOfInfants', form.priceOfInfants);
    data.append('DurationInDays', form.durationInDays);
    data.append('StartPoint', form.startPoint);
    data.append('Transportation', form.transportation);
    data.append('MaxSlots', form.maxSlots);
    data.append('MinSlots', form.minSlots);
    data.append('Note', form.note);
    data.append('IsActive', form.isActive);
    data.append('TourOperatorId', Cookies.get("operatorId"));
  
      data.append('TourAvartarFile', form.TourAvatarFile);
    

    form.departureDates.forEach((item, idx) => {
      data.append(`DepartureDates[${idx}].departureDate1`, item.departureDate1);
    });

    form.tourExperiences.forEach((item, idx) => {
      data.append(`TourExperiences[${idx}].content`, item.content);
    });

    form.tourItineraries.forEach((item, idx) => {
      data.append(`TourItineraries[${idx}].dayNumber`, item.dayNumber);
      data.append(`TourItineraries[${idx}].title`, item.title);
      data.append(`TourItineraries[${idx}].description`, item.description);
      item.itineraryMedia.forEach((media, mediaIdx) => {
        if (media.mediaFile) {
          data.append(`TourItineraries[${idx}].itineraryMedia[${mediaIdx}].mediaFile`, media.mediaFile);
        }
        data.append(`TourItineraries[${idx}].itineraryMedia[${mediaIdx}].mediaType`, media.mediaType);
        data.append(`TourItineraries[${idx}].itineraryMedia[${mediaIdx}].caption`, media.caption);
      });
    });

    form.tourMedia.forEach((item, idx) => {
      if (item.mediaFile) {
        data.append(`TourMedia[${idx}].mediaFile`, item.mediaFile);
      }
      data.append(`TourMedia[${idx}].mediaType`, item.mediaType);
      data.append(`TourMedia[${idx}].mediaUrl`, item.mediaUrl);
    });

    try {
      console.log("Form values before submit:", form);
      for (let pair of data.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      await createTour(data);
      message.success("Tạo tour thành công!");
      setForm(initialState);
      setApiErrors({});
      setApiErrorMessage("");
      toast.success("Tour created successfully!");
      navigate("/operator/tours");
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setApiErrors(error.response.data.errors);
          setApiErrorMessage("");
        } else if (typeof error.response.data === "string") {
          setApiErrorMessage(error.response.data);
          setApiErrors({});
        } else if (error.response.data.title) {
          setApiErrorMessage(error.response.data.title);
          setApiErrors(error.response.data.errors || {});
        } else {
          setApiErrorMessage(JSON.stringify(error.response.data));
          setApiErrors({});
        }
        message.error("Không thể tạo tour: Có lỗi dữ liệu!");
      } else {
        setApiErrorMessage("Không thể tạo tour");
        setApiErrors({});
        message.error("Không thể tạo tour");
      }
    }
  };

  return (
    <>
     <div className="breadcrumb-bar breadcrumb-bg-01 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-12">
                        {/* <h2 className="breadcrumb-title mb-2">Hồ sơ của tôi</h2> */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                        <i className="isax isax-home5"></i>
                                    </a>
                                </li>
                                {/* <li className="breadcrumb-item active" aria-current="page">
                                    Hồ sơ của tôi
                                </li> */}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
      <div className="container py-5">
        <h2 className="mb-4 text-center">Tạo Tour Mới</h2>
         {(apiErrorMessage || Object.keys(apiErrors).length > 0) && (
          <div className="alert alert-danger">
            {apiErrorMessage && <div>{apiErrorMessage}</div>}
            {Object.keys(apiErrors).length > 0 && (
              <ul className="mb-0">
                {Object.entries(apiErrors).map(([field, msgs]) =>
                  msgs.map((msg, idx) => (
                    <li key={field + idx}>
                      <b>{field}:</b> {msg}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        )}
        <form className="card p-4 shadow" onSubmit={handleSubmit}>
          <div className="row">
            {/* Tour Avatar */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Ảnh đại diện tour</label>
              <input
                type="file"
                className="form-control"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
            {/* Title */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Tiêu đề *</label>
              <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            {/* Start Point */}
            <div className="col-md-6 mb-3">
      <label className="form-label">Điểm khởi hành *</label>
      <select
        className={`form-control ${errors.startPoint ? "is-invalid" : ""}`}
        name="startPoint"
        value={form.startPoint}
        onChange={handleChange}
      >
        <option value="">Chọn điểm khởi hành</option>
        {startPoints.map((point) => (
          <option key={point} value={point}>{point}</option>
        ))}
      </select>
      {errors.startPoint && <div className="invalid-feedback">{errors.startPoint}</div>}
    </div>
            {/* Transportation */}
            <div className="col-md-6 mb-3">
  <label className="form-label">Phương tiện *</label>
  <select
    className={`form-control ${errors.transportation ? "is-invalid" : ""}`}
    name="transportation"
    value={form.transportation}
    onChange={handleChange}
  >
    <option value="">Chọn phương tiện</option>
    <option value="Xe Khách">Xe Khách</option>
    <option value="Ô Tô">Ô Tô</option>
    <option value="Thuyền">Thuyền</option>
    <option value="Máy Bay">Máy Bay</option>
    <option value="Tàu Hỏa">Tàu Hỏa</option>
  </select>
  {errors.transportation && <div className="invalid-feedback">{errors.transportation}</div>}
</div>
            {/* Duration */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Thời lượng (ngày)</label>
              <input type="number" min={1} className="form-control" name="durationInDays" value={form.durationInDays} onChange={handleChange} />
            </div>
            {/* Max Slots */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Số chỗ tối đa *</label>
              <input type="number" className={`form-control ${errors.maxSlots ? "is-invalid" : ""}`} name="maxSlots" value={form.maxSlots} onChange={handleChange} />
              {errors.maxSlots && <div className="invalid-feedback">{errors.maxSlots}</div>}
            </div>
            {/* Min Slots */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Số chỗ tối thiểu *</label>
              <input type="number" className={`form-control ${errors.minSlots ? "is-invalid" : ""}`} name="minSlots" value={form.minSlots} onChange={handleChange} />
              {errors.minSlots && <div className="invalid-feedback">{errors.minSlots}</div>}
            </div>
            {/* Price of Adults */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Giá người lớn</label>
              <input type="number" className="form-control" name="priceOfAdults" value={form.priceOfAdults} onChange={handleChange} />
            </div>
            {/* Price of Children */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Giá trẻ em</label>
              <input type="number" className="form-control" name="priceOfChildren" value={form.priceOfChildren} onChange={handleChange} />
            </div>
            {/* Price of Infants */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Giá trẻ nhỏ</label>
              <input type="number" className="form-control" name="priceOfInfants" value={form.priceOfInfants} onChange={handleChange} />
            </div>
            {/* Description */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Mô tả</label>
              <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={2} />
            </div>
            {/* Note */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Ghi chú</label>
              <textarea className="form-control" name="note" value={form.note || ""} onChange={handleChange} rows={2} />
            </div>
            {/* Departure Dates */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Ngày khởi hành</label>
              {form.departureDates.map((item, idx) => (
                <div key={idx} className="input-group mb-2">
                  <input
                    type="date"
                    className="form-control"
                    value={item.departureDate1}
                    onChange={e => handleArrayChange("departureDates", idx, "departureDate1", e.target.value)}
                  />
                  <button type="button" className="btn btn-danger" onClick={() => removeArrayField("departureDates", idx)} disabled={form.departureDates.length === 1}>Xóa</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => addArrayField("departureDates", { departureDate1: "" })}>Thêm ngày khởi hành</button>
            </div>
            {/* Tour Experiences */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Trải nghiệm tour</label>
              {form.tourExperiences.map((item, idx) => (
                <div key={idx} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={item.content}
                    onChange={e => handleArrayChange("tourExperiences", idx, "content", e.target.value)}
                    placeholder="Nội dung trải nghiệm"
                  />
                  <button type="button" className="btn btn-danger" onClick={() => removeArrayField("tourExperiences", idx)} disabled={form.tourExperiences.length === 1}>Xóa</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => addArrayField("tourExperiences", { content: "" })}>Thêm trải nghiệm</button>
            </div>
            {/* Tour Itineraries - Modal Trigger */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Lịch trình tour</label>
              <div>
                {form.tourItineraries.map((item, idx) => (
                  <div key={idx} className="border p-3 mb-2 d-flex justify-content-between align-items-center">
                    <div>
                      <b>Ngày {item.dayNumber}:</b> {item.title}
                    </div>
                    <div>
                      <button type="button" className="btn btn-sm btn-warning me-2" onClick={() => openItineraryModal(idx)}>Chỉnh sửa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tour Media */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Media tour</label>
              {form.tourMedia.map((item, idx) => (
                <div key={idx} className="input-group mb-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={e => handleTourMediaFileChange(idx, e.target.files[0])}
                  />
                  <select
                    className="form-select"
                    value={item.mediaType}
                    onChange={e => handleArrayChange("tourMedia", idx, "mediaType", e.target.value)}
                  >
                    <option value="">Chọn loại media</option>
                    <option value="Image">Hình ảnh</option>
                    <option value="Video">Video</option>
                  </select>
                  <button type="button" className="btn btn-danger" onClick={() => removeArrayField("tourMedia", idx)} disabled={form.tourMedia.length === 1}>Xóa</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => addArrayField("tourMedia", { mediaFile: null, mediaType: "", mediaUrl: "" })}>Thêm media</button>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Tạo tour
            </button>
          </div>
        </form>
        {/* Itinerary Modal */}
        <Modal
          title={itineraryEditIdx !== null ? "Chỉnh sửa lịch trình" : "Thêm lịch trình"}
          open={showItineraryModal}
          onCancel={closeItineraryModal}
          footer={[
            <Button key="cancel" onClick={closeItineraryModal}>Hủy</Button>,
            <Button key="save" type="primary" onClick={saveItinerary}>Lưu</Button>
          ]}
        >
          <div className="mb-2">
            <label>Ngày</label>
            <input type="number" className="form-control" name="dayNumber" value={itineraryForm.dayNumber} onChange={handleItineraryFormChange} />
          </div>
          <div className="mb-2">
            <label>Tiêu đề</label>
            <input type="text" className="form-control" name="title" value={itineraryForm.title} onChange={handleItineraryFormChange} />
          </div>
          <div className="mb-2">
            <label>Mô tả</label>
            <input type="text" className="form-control" name="description" value={itineraryForm.description} onChange={handleItineraryFormChange} />
          </div>
          <div className="mb-2">
            <label>Media lịch trình</label>
            {itineraryForm.itineraryMedia.map((media, mediaIdx) => (
              <div key={mediaIdx} className="input-group mb-2">
                <input
                  type="file"
                  className="form-control"
                  onChange={e => handleItineraryMediaFileChange(mediaIdx, e.target.files[0])}
                />
                <select
                  className="form-select"
                  value={media.mediaType}
                  onChange={e => handleItineraryMediaChange(mediaIdx, "mediaType", e.target.value)}
                >
                  <option value="">Chọn loại media</option>
                  <option value="Image">Hình ảnh</option>
                  <option value="Video">Video</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chú thích"
                  value={media.caption}
                  onChange={e => handleItineraryMediaChange(mediaIdx, "caption", e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => removeItineraryMedia(mediaIdx)} disabled={itineraryForm.itineraryMedia.length === 1}>Xóa</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addItineraryMedia}>Thêm media lịch trình</button>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default CreateTourPage;