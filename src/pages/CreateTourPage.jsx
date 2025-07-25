import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTour } from "../services/tourService";
import { message, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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
  tourType: "Share",
  note: "",
  tourStatus: "Active",
  isActive: true,
 TourOperatorId: 1,
  departureDates: [{ departureDate1: "" }],
  tourExperiences: [{ content: "" }],
  tourItineraries: [],
  tourMedia: [{ mediaFile: null, mediaType: "", mediaUrl: "" }],
};

function CreateTourPage() {
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
  const navigate = useNavigate(); 
  // Handle input change for simple fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle array fields
  const handleArrayChange = (field, idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      ),
    }));
  };

  // Handle file input for tourMedia
  const handleTourMediaFileChange = (idx, file) => {
    setForm((prev) => ({
      ...prev,
      tourMedia: prev.tourMedia.map((item, i) =>
        i === idx ? { ...item, mediaFile: file } : item
      ),
    }));
  };

  // Add/remove for array fields
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

  // Itinerary Modal handlers
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

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.priceOfAdults) newErrors.priceOfAdults = "Price is required";
    if (!form.priceOfChildren) newErrors.priceOfChildren = "Price is required";
    if (!form.priceOfInfants) newErrors.priceOfChildren = "Price is required";
    if (!form.startPoint) newErrors.startPoint = "Start Point is required";
    if (!form.transportation) newErrors.transportation = "Transportation is required";
    if (!form.maxSlots) newErrors.maxSlots = "Max Slots is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
    Object.values(newErrors).forEach(msg => toast.error(msg));
    return;
  }

    // Build FormData
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
    data.append('TourType', form.tourType);
    data.append('Note', form.note);
    data.append('TourStatus', form.tourStatus);
    data.append('IsActive', form.isActive);
    data.append('TourOperatorId', 1); // Luôn gửi lên là 1
    // DepartureDates
    form.departureDates.forEach((item, idx) => {
      data.append(`DepartureDates[${idx}].departureDate1`, item.departureDate1);
    });

    // TourExperiences
    form.tourExperiences.forEach((item, idx) => {
      data.append(`TourExperiences[${idx}].content`, item.content);
    });

    // TourItineraries
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

    // TourMedia
    form.tourMedia.forEach((item, idx) => {
      if (item.mediaFile) {
        data.append(`TourMedia[${idx}].mediaFile`, item.mediaFile);
      }
      data.append(`TourMedia[${idx}].mediaType`, item.mediaType);
      data.append(`TourMedia[${idx}].mediaUrl`, item.mediaUrl);
    });

   try {
  // Hiển thị thông tin form trước khi gửi đi
  console.log("Form values before submit:", form);

  // Hiển thị thông tin FormData (chỉ tên trường và giá trị text/file)
  for (let pair of data.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }

  await createTour(data);
  message.success("Tạo tour thành công!");
  setForm(initialState);
  toast.success("Tour created successfully!");
  navigate("/tour-list"); // Điều hướng đến trang danh sách tour sau khi tạo thành công
} catch (error) {
  if (error.response && error.response.data) {
    // Nếu backend trả về lỗi dạng object hoặc string
    const errMsg =
      typeof error.response.data === "string"
        ? error.response.data
        : JSON.stringify(error.response.data);
    message.error(`Không thể tạo tour: ${errMsg}`);
  } else {
    message.error("Không thể tạo tour");
  }
}
  };

  return (
    <>
     <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <h2 className="breadcrumb-title mb-2">Tour</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center mb-0">
                      <li className="breadcrumb-item">
                        <a href="home">
                          <FontAwesomeIcon icon={faHome} />
                        </a>
                      </li>
                      <li className="breadcrumb-item">Tạo tour</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
    <div className="container py-5">
      <h2 className="mb-4 text-center">Create New Tour</h2>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="row">
          {/* Các trường cơ bản */}
          {/* --- Nhóm 1: Thông tin cơ bản --- */}
<div className="col-md-6 mb-3">
  <label className="form-label">Title *</label>
  <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} />
  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Start Point *</label>
  <input type="text" className={`form-control ${errors.startPoint ? "is-invalid" : ""}`} name="startPoint" value={form.startPoint} onChange={handleChange} />
  {errors.startPoint && <div className="invalid-feedback">{errors.startPoint}</div>}
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Transportation *</label>
  <input type="text" className={`form-control ${errors.transportation ? "is-invalid" : ""}`} name="transportation" value={form.transportation} onChange={handleChange} />
  {errors.transportation && <div className="invalid-feedback">{errors.transportation}</div>}
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Duration (days)</label>
  <input type="text" className="form-control" name="durationInDays" value={form.durationInDays} onChange={handleChange} />
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Max Slots *</label>
  <input type="number" className={`form-control ${errors.maxSlots ? "is-invalid" : ""}`} name="maxSlots" value={form.maxSlots} onChange={handleChange} />
  {errors.maxSlots && <div className="invalid-feedback">{errors.maxSlots}</div>}
</div>

{/* --- Nhóm 2: Giá Tour --- */}
<div className="col-md-4 mb-3">
  <label className="form-label">Price of Adults</label>
  <input type="number" className="form-control" name="priceOfAdults" value={form.priceOfAdults} onChange={handleChange} />
</div>

<div className="col-md-4 mb-3">
  <label className="form-label">Price of Children</label>
  <input type="number" className="form-control" name="priceOfChildren" value={form.priceOfChildren} onChange={handleChange} />
</div>

<div className="col-md-4 mb-3">
  <label className="form-label">Price of Infants</label>
  <input type="number" className="form-control" name="priceOfInfants" value={form.priceOfInfants} onChange={handleChange} />
</div>

{/* --- Nhóm 3: Tùy chọn loại tour và trạng thái --- */}
<div className="col-md-6 mb-3">
  <label className="form-label">Tour Type</label>
  <select className="form-select" name="tourType" value={form.tourType} onChange={handleChange}>
    <option value="Share">Share</option>
    <option value="Private">Private</option>
  </select>
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Tour Status</label>
  <select className="form-select" name="tourStatus" value={form.tourStatus} onChange={handleChange}>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
</div>

{/* --- Nhóm 4: Mô tả và ghi chú --- */}
<div className="col-md-12 mb-3">
  <label className="form-label">Description</label>
  <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={2} />
</div>

<div className="col-md-12 mb-3">
  <label className="form-label">Note</label>
  <textarea className="form-control" name="note" value={form.note || ""} onChange={handleChange} rows={2} />
</div>


          {/* Departure Dates */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Departure Dates</label>
            {form.departureDates.map((item, idx) => (
              <div key={idx} className="input-group mb-2">
                <input
                  type="date"
                  className="form-control"
                  value={item.departureDate1}
                  onChange={e => handleArrayChange("departureDates", idx, "departureDate1", e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => removeArrayField("departureDates", idx)} disabled={form.departureDates.length === 1}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addArrayField("departureDates", { departureDate1: "" })}>Add Departure Date</button>
          </div>

          {/* Tour Experiences */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Tour Experiences</label>
            {form.tourExperiences.map((item, idx) => (
              <div key={idx} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={item.content}
                  onChange={e => handleArrayChange("tourExperiences", idx, "content", e.target.value)}
                  placeholder="Experience Content"
                />
                <button type="button" className="btn btn-danger" onClick={() => removeArrayField("tourExperiences", idx)} disabled={form.tourExperiences.length === 1}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addArrayField("tourExperiences", { content: "" })}>Add Experience</button>
          </div>

          {/* Tour Itineraries - Modal Trigger */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Tour Itineraries</label>
            <div>
              {form.tourItineraries.map((item, idx) => (
                <div key={idx} className="border p-3 mb-2 d-flex justify-content-between align-items-center">
                  <div>
                    <b>Day {item.dayNumber}:</b> {item.title}
                  </div>
                  <div>
                    <button type="button" className="btn btn-sm btn-warning me-2" onClick={() => openItineraryModal(idx)}>Edit</button>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeArrayField("tourItineraries", idx)} disabled={form.tourItineraries.length === 1}>Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => openItineraryModal(null)}>Add Itinerary</button>
            </div>
          </div>

          {/* Tour Media */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Tour Media</label>
            {form.tourMedia.map((item, idx) => (
              <div key={idx} className="input-group mb-2">
                <input
                  type="file"
                  className="form-control"
                  onChange={e => handleTourMediaFileChange(idx, e.target.files[0])}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Media Type"
                  value={item.mediaType}
                  onChange={e => handleArrayChange("tourMedia", idx, "mediaType", e.target.value)}
                />
                
                <button type="button" className="btn btn-danger" onClick={() => removeArrayField("tourMedia", idx)} disabled={form.tourMedia.length === 1}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addArrayField("tourMedia", { mediaFile: null, mediaType: "", mediaUrl: "" })}>Add Media</button>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Create Tour
          </button>
        </div>
      </form>

      {/* Itinerary Modal */}
      <Modal
        title={itineraryEditIdx !== null ? "Edit Itinerary" : "Add Itinerary"}
        open={showItineraryModal}
        onCancel={closeItineraryModal}
        footer={[
          <Button key="cancel" onClick={closeItineraryModal}>Cancel</Button>,
          <Button key="save" type="primary" onClick={saveItinerary}>Save</Button>
        ]}
      >
        <div className="mb-2">
          <label>Day Number</label>
          <input type="number" className="form-control" name="dayNumber" value={itineraryForm.dayNumber} onChange={handleItineraryFormChange} />
        </div>
        <div className="mb-2">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={itineraryForm.title} onChange={handleItineraryFormChange} />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <input type="text" className="form-control" name="description" value={itineraryForm.description} onChange={handleItineraryFormChange} />
        </div>
        <div className="mb-2">
          <label>Itinerary Media</label>
          {itineraryForm.itineraryMedia.map((media, mediaIdx) => (
            <div key={mediaIdx} className="input-group mb-2">
              <input
                type="file"
                className="form-control"
                onChange={e => handleItineraryMediaFileChange(mediaIdx, e.target.files[0])}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Media Type"
                value={media.mediaType}
                onChange={e => handleItineraryMediaChange(mediaIdx, "mediaType", e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Caption"
                value={media.caption}
                onChange={e => handleItineraryMediaChange(mediaIdx, "caption", e.target.value)}
              />
              <button type="button" className="btn btn-danger" onClick={() => removeItineraryMedia(mediaIdx)} disabled={itineraryForm.itineraryMedia.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addItineraryMedia}>Add Itinerary Media</button>
        </div>
      </Modal>
    </div>
    </>
  );
}
export default CreateTourPage;