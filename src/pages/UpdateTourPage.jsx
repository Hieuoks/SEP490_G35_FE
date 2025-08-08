import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTourDetailForOperatorUpdate, updateTour } from "../services/tourService";
import { message, Modal, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
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
  minSlots: "",
  note: "",
  isActive: true,
  tourOperatorId: 1,
  tourId: null,
  tourStatus: "Active",
  departureDates: [{ id: null, departureDate1: "" }],
  tourExperiences: [{ id: null, content: "" }],
  tourItineraries: [],
  tourMedia: [{ id: null, mediaFile: null, mediaType: "", mediaUrl: "" }],
  TourAvartarFile: null,
};

function UpdateTourPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [itineraryEditIdx, setItineraryEditIdx] = useState(null);
  const [itineraryForm, setItineraryForm] = useState({
    dayNumber: "",
    title: "",
    description: "",
    itineraryMedia: [{ mediaFile: null, mediaType: "", caption: "" }]
  });
  const [showDepartureDates, setShowDepartureDates] = useState(false);
  const [departurePage, setDeparturePage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  const { id } = useParams();
const [loading, setLoading] = useState(false); // loading cho update
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTourDetailForOperatorUpdate(id);
console.log("Fetched tour data:", data);
        setForm({
  ...initialState,
  title: data.title || "",
  description: data.description || "",
  priceOfAdults: data.priceOfAdults?.toString() || "",
  priceOfChildren: data.priceOfChildren?.toString() || "",
  priceOfInfants: data.priceOfInfants?.toString() || "",
  durationInDays: data.durationInDays?.toString() || "",
  startPoint: data.startPoint || "",
  transportation: data.transportation || "",
  maxSlots: data.maxSlots?.toString() || "",
  minSlots: data.minSlots?.toString() || "",
  note: data.note || "",
  isActive: data.isActive ?? true,
  tourOperatorId: data.tourOperatorId || 1,
  tourId: id,
  tourStatus: data.tourStatus || "Active",
  departureDates: data.departureDates?.length
    ? data.departureDates.map(d => ({
        id: d.id ?? 0,
        departureDate1: d.departureDate1 || "",
        isActive: d.isActive
      }))
    : [],
  tourExperiences: data.tourExperiences?.length
    ? data.tourExperiences.map(e => ({
        id: e.id ?? 0,
        content: e.content || "",
        isActive: e.isActive
      }))
    : [],
  tourItineraries: data.tourItineraries?.length
    ? data.tourItineraries.map(i => ({
        itineraryId: i.itineraryId ?? 0,
        dayNumber: i.dayNumber,
        title: i.title || "",
        description: i.description || "",
        isActive: i.isActive,
        itineraryMedia: i.itineraryMedia?.length
          ? i.itineraryMedia.map(m => ({
              mediaId: m.mediaId ?? 0,
              mediaUrl: m.mediaUrl,
              mediaType: m.mediaType,
              caption: m.caption,
              isActive: m.isActive,
              mediaFile: null
            }))
          : []
      }))
    : [],
  tourMedia: data.tourMedia?.length
    ? data.tourMedia.map(m => ({
        id: m.id ?? 0,
        mediaUrl: m.mediaUrl,
        mediaType: m.mediaType,
        isActive: m.isActive,
        mediaFile: null
      }))
    : [],
});
      } catch (error) {
        toast.error("Không tìm thấy tour!");
        navigate("/listpage");
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [id]);

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
      TourAvartarFile: e.target.files[0] || null,
    }));
  };

  const addArrayField = (field, newItem) => {
  // Đảm bảo id = 0 khi thêm mới
  let itemWithId = { ...newItem };
  if (field === "departureDates") itemWithId = { ...itemWithId, id: 0 };
  if (field === "tourExperiences") itemWithId = { ...itemWithId, id: 0 };
  if (field === "tourMedia") itemWithId = { ...itemWithId, id: 0 };
  setForm((prev) => {
    // DepartureDates: thêm mới lên đầu
    if (field === "departureDates") {
      return {
        ...prev,
        [field]: [itemWithId, ...prev[field]],
      };
    }
    // Các field khác: thêm mới vào cuối
    return {
      ...prev,
      [field]: [...prev[field], itemWithId],
    };
  });
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
const addItineraryMedia = () => {
  setItineraryForm((prev) => ({
    ...prev,
    itineraryMedia: [
      ...prev.itineraryMedia,
      { mediaFile: null, mediaType: "", caption: "", mediaId: 0 }
    ]
  }));
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
const addItinerary = () => {
  setForm((prev) => ({
    ...prev,
    tourItineraries: [
      ...prev.tourItineraries,
      {
        itineraryId: 0,
        dayNumber: "",
        title: "",
        description: "",
        isActive: true,
        itineraryMedia: [],
      },
    ],
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

  // Departure Dates pagination
  const totalPages = Math.ceil(form.departureDates.length / pageSize);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.priceOfAdults) newErrors.priceOfAdults = "Price for adults is required";
    if (!form.startPoint) newErrors.startPoint = "Start Point is required";
    if (!form.transportation) newErrors.transportation = "Transportation is required";
    if (!form.maxSlots) newErrors.maxSlots = "Max Slots is required";
    if (!form.minSlots) newErrors.minSlots = "Min Slots is required";
    if (!form.TourAvartarFile) newErrors.TourAvartarFile = "Tour avatar is required";
 if (!form.tourStatus) newErrors.tourStatus = "Tour status is required";
    setErrors(newErrors);
    setApiErrors({});
    setApiErrorMessage("");
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }
    // Build FormData
    let data = new FormData();
    data.append("TourId", form.tourId);
    data.append("Title", form.title.trim());
    data.append("Description", form.description);
    data.append("PriceOfAdults", form.priceOfAdults);
    data.append("PriceOfChildren", form.priceOfChildren);
    data.append("PriceOfInfants", form.priceOfInfants);
    data.append("DurationInDays", form.durationInDays.trim());
    data.append("StartPoint", form.startPoint);
    data.append("Transportation", form.transportation);
    data.append("MaxSlots", form.maxSlots);
    data.append("MinSlots", form.minSlots);
    data.append("Note", form.note);
    data.append("IsActive", form.isActive);
    data.append("TourOperatorId", form.tourOperatorId);
    data.append("TourStatus", form.tourStatus);
    if (form.TourAvatarFile) {
      data.append("TourAvartarFile", form.TourAvartarFile);
    }

    form.departureDates.forEach((item, idx) => {
      data.append(`DepartureDates[${idx}].Id`, item.id);
      data.append(`DepartureDates[${idx}].DepartureDate1`, item.departureDate1);
    });

    form.tourExperiences.forEach((item, idx) => {
      data.append(`TourExperiences[${idx}].Id`, item.id);
      data.append(`TourExperiences[${idx}].Content`, item.content);
    });

    form.tourItineraries.forEach((itinerary, idx) => {
      data.append(`TourItineraries[${idx}].ItineraryId`, itinerary.itineraryId);
      data.append(`TourItineraries[${idx}].DayNumber`, itinerary.dayNumber);
      data.append(`TourItineraries[${idx}].Title`, itinerary.title);
      data.append(`TourItineraries[${idx}].Description`, itinerary.description);

      itinerary.itineraryMedia.forEach((media, mediaIdx) => {
        data.append(`TourItineraries[${idx}].ItineraryMedia[${mediaIdx}].MediaId`, media.mediaId);
        data.append(`TourItineraries[${idx}].ItineraryMedia[${mediaIdx}].MediaType`, media.mediaType);
        data.append(`TourItineraries[${idx}].ItineraryMedia[${mediaIdx}].Caption`, media.caption);
        if (media.mediaFile) {
          data.append(`TourItineraries[${idx}].ItineraryMedia[${mediaIdx}].MediaFile`, media.mediaFile);
        }
      });
    });

    form.tourMedia.forEach((media, idx) => {
      data.append(`TourMedia[${idx}].Id`, media.id);
      data.append(`TourMedia[${idx}].MediaType`, media.mediaType);
      data.append(`TourMedia[${idx}].MediaUrl`, media.mediaUrl);
      if (media.mediaFile) {
        data.append(`TourMedia[${idx}].MediaFile`, media.mediaFile);
      }
    });

    try {
      await updateTour(data);
      message.success("Cập nhật tour thành công!");
      toast.success("Tour updated successfully!");
      setApiErrors({});
      setApiErrorMessage("");
      navigate("/tour/detail/" + form.tourId);
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
        message.error("Không thể cập nhật tour: Có lỗi dữ liệu!");
      } else {
        setApiErrorMessage("Không thể cập nhật tour");
        setApiErrors({});
        message.error("Không thể cập nhật tour");
      }
    }
        setLoading(false); // Kết thúc loading sau khi xử lý xong
  };

  return (
    <>
    
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Gói du lịch</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="home">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Chỉnh sửa gói du lịch</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="mb-4 text-center">Update Tour</h2>
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
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 120 }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">Đang cập nhật...</span>
          </div>
        )}
        {!loading && (
        <form className="card p-4 shadow" onSubmit={handleSubmit}>
          <div className="row">
            {/* Tour Avatar */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Tour Avatar</label>
              <input
                type="file"
                className="form-control"
                onChange={handleAvatarChange}
                accept="image/*"
              />
              {errors.TourAvartarFile && <div className="invalid-feedback d-block">{errors.TourAvartarFile}</div>}
            </div>
            {/* Title */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Title *</label>
              <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Tour Status *</label>
              <select className={`form-select ${errors.tourStatus ? "is-invalid" : ""}`} name="tourStatus" value={form.tourStatus} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.tourStatus && <div className="invalid-feedback">{errors.tourStatus}</div>}
            </div>
            {/* Start Point */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Point *</label>
              <input type="text" className={`form-control ${errors.startPoint ? "is-invalid" : ""}`} name="startPoint" value={form.startPoint} onChange={handleChange} />
              {errors.startPoint && <div className="invalid-feedback">{errors.startPoint}</div>}
            </div>
            {/* Transportation */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Transportation *</label>
              <input type="text" className={`form-control ${errors.transportation ? "is-invalid" : ""}`} name="transportation" value={form.transportation} onChange={handleChange} />
              {errors.transportation && <div className="invalid-feedback">{errors.transportation}</div>}
            </div>
            {/* Duration */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration (days)</label>
              <input type="number" min={1} className="form-control" name="durationInDays" value={form.durationInDays} onChange={handleChange} />
            </div>
            {/* Max Slots */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Max Slots *</label>
              <input type="number" className={`form-control ${errors.maxSlots ? "is-invalid" : ""}`} name="maxSlots" value={form.maxSlots} onChange={handleChange} />
              {errors.maxSlots && <div className="invalid-feedback">{errors.maxSlots}</div>}
            </div>
            {/* Min Slots */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Min Slots *</label>
              <input type="number" className={`form-control ${errors.minSlots ? "is-invalid" : ""}`} name="minSlots" value={form.minSlots} onChange={handleChange} />
              {errors.minSlots && <div className="invalid-feedback">{errors.minSlots}</div>}
            </div>
            {/* Price of Adults */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Price of Adults</label>
              <input type="number" className="form-control" name="priceOfAdults" value={form.priceOfAdults} onChange={handleChange} />
            </div>
            {/* Price of Children */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Price of Children</label>
              <input type="number" className="form-control" name="priceOfChildren" value={form.priceOfChildren} onChange={handleChange} />
            </div>
            {/* Price of Infants */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Price of Infants</label>
              <input type="number" className="form-control" name="priceOfInfants" value={form.priceOfInfants} onChange={handleChange} />
            </div>
            {/* Description */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={2} />
            </div>
            {/* Note */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Note</label>
              <textarea className="form-control" name="note" value={form.note || ""} onChange={handleChange} rows={2} />
            </div>
          
           
            {/* Departure Dates - Ẩn/hiện và phân trang */}
         <div className="col-md-12 mb-3">
  <label className="form-label">Departure Dates</label>
  <button
    type="button"
    className="btn btn-info ms-2"
    onClick={() => setShowDepartureDates((prev) => !prev)}
  >
    {showDepartureDates ? "Ẩn" : "Hiển thị"}
  </button>
  {showDepartureDates && (
    <div className="mt-3">
      {form.departureDates.length === 0 ? (
        <button
          type="button"
          className="btn btn-secondary mb-2"
          onClick={() => addArrayField("departureDates", { id: 0, departureDate1: "" })}
        >
          Add Departure Date
        </button>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-secondary mb-2"
            onClick={() => addArrayField("departureDates", { id: 0, departureDate1: "" })}
          >
            Add Departure Date
          </button>
          {form.departureDates
            .slice((departurePage - 1) * pageSize, departurePage * pageSize)
            .map((item, idx) => (
              <div key={idx + (departurePage - 1) * pageSize} className="input-group mb-2">
                <input
                  type="date"
                  className="form-control"
                  value={
                    item.departureDate1
                      ? new Date(item.departureDate1).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={e =>
                    handleArrayChange(
                      "departureDates",
                      idx + (departurePage - 1) * pageSize,
                      "departureDate1",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeArrayField("departureDates", idx + (departurePage - 1) * pageSize)}
                  disabled={form.departureDates.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-2">
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={() => setDeparturePage((prev) => Math.max(prev - 1, 1))}
                disabled={departurePage === 1}
              >
                &lt;
              </button>
              <span>
                Trang {departurePage}/{totalPages}
              </span>
              <button
                type="button"
                className="btn btn-outline-primary ms-2"
                onClick={() => setDeparturePage((prev) => Math.min(prev + 1, totalPages))}
                disabled={departurePage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )}
</div>

            {/* Tour Experiences */}
          <div className="col-md-12 mb-3">
  <label className="form-label">Tour Experiences</label>
  {form.tourExperiences.length === 0 ? (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => addArrayField("tourExperiences", { id: 0, content: "" })}
    >
      Add Experience
    </button>
  ) : (
    <>
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
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => addArrayField("tourExperiences", { id: 0, content: "" })}
      >
        Add Experience
      </button>
    </>
  )}
</div>


            {/* Tour Itineraries - Modal Trigger */}
            <div className="col-md-12 mb-3">
  <label className="form-label">Tour Itineraries</label>
  <div>
    {form.tourItineraries.length === 0 ? (
      <button type="button" className="btn btn-secondary" onClick={addItinerary}>Add Itinerary</button>
    ) : (
      <>
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
        <button type="button" className="btn btn-secondary" onClick={addItinerary}>Add Itinerary</button>
      </>
    )}
  </div>
</div>

            {/* Tour Media */}
           <div className="col-md-12 mb-3">
  <label className="form-label">Tour Media</label>
  {form.tourMedia.length === 0 ? (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => addArrayField("tourMedia", { id: 0, mediaFile: null, mediaType: "", mediaUrl: "" })}
    >
      Add Media
    </button>
  ) : (
    <>
      {form.tourMedia.map((item, idx) => (
        <div key={idx} className="input-group mb-2 align-items-center">
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
                          <option value="">Select Type</option>
                          <option value="Image">Image</option>
                          <option value="Video">Video</option>
                        </select>
          <input
            type="text"
            className="form-control"
            placeholder="Media URL"
            value={item.mediaUrl}
            onChange={e =>
              handleArrayChange("tourMedia", idx, "mediaUrl", e.target.value)
            }
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => removeArrayField("tourMedia", idx)}
            disabled={form.tourMedia.length === 1}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => addArrayField("tourMedia", { id: 0, mediaFile: null, mediaType: "", mediaUrl: "" })}
      >
        Add Media
      </button>
    </>
  )}
</div>
            {form.tourMedia.length > 0 && (
              <div className="col-md-12 mb-3">
                <label className="form-label">Preview All Uploaded Images</label>
                <div className="d-flex flex-wrap gap-2">
                  {form.tourMedia.map((item, idx) =>
                    item.mediaUrl ? (
                      <div key={idx} className="border p-1" style={{ width: 120 }}>
                        <img
                          src={item.mediaUrl}
                          alt={`Media ${idx}`}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "4px"
                          }}
                        />
                        <div className="small text-center mt-1">
                          <strong>{item.mediaType || "Unknown"}</strong>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Update Tour
            </button>
          </div>
        </form>
      )
}
   
        {/* Itinerary Modal giữ nguyên như cũ */}
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
                <select
                    className="form-select"
                    value={media.mediaType}
                    onChange={e => handleItineraryMediaChange(mediaIdx, "mediaType", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                  </select>
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
          {itineraryForm.itineraryMedia.length > 0 && (
            <div className="mb-3">
              <label>Preview All Itinerary Media</label>
              <div className="d-flex flex-wrap gap-2">
                {itineraryForm.itineraryMedia.map((media, idx) =>
                  media.mediaUrl ? (
                    <div key={idx} className="border p-1" style={{ width: 120 }}>
                      <img
                        src={media.mediaUrl}
                        alt={`Itinerary Media ${idx}`}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "4px"
                        }}
                      />
                      <div className="small text-center mt-1">
                        <strong>{media.caption || "No Caption"}</strong>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
           
    </>
    
  );
}

export default UpdateTourPage;