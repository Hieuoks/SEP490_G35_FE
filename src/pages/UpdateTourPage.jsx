import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTourDetail, updateTour } from "../services/tourService";
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
  tourType: "Share",
  note: "",
  tourStatus: "Active",
  isActive: true,
  tourOperatorId: 1,
  tourId: null, // nếu dùng để update thì gán ID
  departureDates: [
    {
      id: null, // nếu update
      departureDate1: ""
    }
  ],
  tourExperiences: [
    {
      id: null,
      content: ""
    }
  ],
  tourItineraries: [
    {
      itineraryId: null,
      dayNumber: "",
      title: "",
      description: "",
      itineraryMedia: [
        {
          mediaId: null,
          mediaFile: null, // dùng File object hoặc fs.createReadStream bên backend
          mediaType: "",
          caption: ""
        }
      ]
    }
  ],
  tourMedia: [
    {
      id: null,
      mediaFile: null,
      mediaType: ""
    }
  ]
};


function UpdateTourPage() {
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
  const { id } = useParams();

 useEffect(() => {
  async function fetchData() {
    try {
      const data = await getTourDetail(id);

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
        tourType: data.tourType || "Share",
        note: data.note || "",
        tourStatus: data.tourStatus || "Active",
        isActive: data.isActive ?? true,
        TourOperatorId: data.tourOperatorId || 1,
tourId:id,
        // Include IDs and format fallback
        departureDates: data.departureDates?.length
          ? data.departureDates.map(d => ({
              id: d.id,
              departureDate1: d.departureDate1 || "",
              isActive: d.isActive
            }))
          : [{ departureDate1: "" }],

        tourExperiences: data.tourExperiences?.length
          ? data.tourExperiences.map(e => ({
              id: e.id,
              content: e.content || "",
              isActive: e.isActive
            }))
          : [{ content: "" }],

        tourItineraries: data.tourItineraries?.length
          ? data.tourItineraries.map(i => ({
              itineraryId: i.itineraryId,
              dayNumber: i.dayNumber,
              title: i.title || "",
              description: i.description || "",
              isActive: i.isActive,
              itineraryMedia: i.itineraryMedia?.length
                ? i.itineraryMedia.map(m => ({
                    mediaId: m.mediaId,
                    mediaUrl: m.mediaUrl,
                    mediaType: m.mediaType,
                    caption: m.caption,
                    isActive: m.isActive,
                    mediaFile: null // default for upload
                  }))
                : []
            }))
          : [],

        tourMedia: data.tourMedia?.length
          ? data.tourMedia.map(m => ({
              id: m.id,
              mediaUrl: m.mediaUrl,
              mediaType: m.mediaType,
              isActive: m.isActive,
              mediaFile: null // for upload
            }))
          : [{ mediaFile: null, mediaType: "", mediaUrl: "" }]
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

  // Validate
  const newErrors = {};
  if (!form.title) newErrors.title = "Title is required";
  if (!form.priceOfAdults) newErrors.priceOfAdults = "Price for adults is required";
  if (!form.startPoint) newErrors.startPoint = "Start Point is required";
  if (!form.transportation) newErrors.transportation = "Transportation is required";
  if (!form.maxSlots) newErrors.maxSlots = "Max Slots is required";

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) {
    Object.values(newErrors).forEach(msg => toast.error(msg));
    return;
  }
 console.log("form", form);
  // Build FormData
  let data = new FormData();
  data.append("TourId", form.tourId);
  data.append("Title", form.title.trim());
  data.append("Description", form.description);
  data.append("PriceOfAdults", form.priceOfAdults);
  data.append("PriceOfChildren", form.priceOfChildren);
  data.append("PriceOfInfants", form.priceOfInfants);
  data.append("DurationInDays", form.durationInDays.trim() );
  data.append("StartPoint", form.startPoint);
  data.append("Transportation", form.transportation);
  data.append("MaxSlots", form.maxSlots);
  data.append("TourType", form.tourType);
  data.append("Note", form.note);
  data.append("TourStatus", form.tourStatus);
  data.append("IsActive", form.isActive);
  data.append("TourOperatorId", form.tourOperatorId);

  // DepartureDates
  form.departureDates.forEach((item, idx) => {
    data.append(`DepartureDates[${idx}].Id`, item.id);
    data.append(`DepartureDates[${idx}].DepartureDate1`, item.departureDate1);
  });

  // TourExperiences
  form.tourExperiences.forEach((item, idx) => {
    data.append(`TourExperiences[${idx}].Id`, item.id);
    data.append(`TourExperiences[${idx}].Content`, item.content);
  });

  // TourItineraries
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

  // TourMedia (ảnh tổng)
  form.tourMedia.forEach((media, idx) => {
    data.append(`TourMedia[${idx}].Id`, media.id);
    data.append(`TourMedia[${idx}].MediaType`, media.mediaType);
    if (media.mediaFile) {
      data.append(`TourMedia[${idx}].MediaFile`, media.mediaFile);
    }
  });

 for (let pair of data.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }

  try {
    await updateTour( data);
    message.success("Cập nhật tour thành công!");
    toast.success("Tour updated successfully!");
    navigate("/tour/detail/"+id);
  } catch (error) {
    const errMsg = error.response?.data
      ? typeof error.response.data === "string"
        ? error.response.data
        : JSON.stringify(error.response.data)
      : "Không thể cập nhật tour";
    message.error(`Lỗi cập nhật: ${errMsg}`);
  }
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
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="row">
          {/* Các trường cơ bản */}
         <div className="row">
  <div className="col-md-6 mb-3">
    <label className="form-label">Title *</label>
    <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} />
    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Price Adults *</label>
    <input type="number" className={`form-control ${errors.priceOfAdults ? "is-invalid" : ""}`} name="priceOfAdults" value={form.priceOfAdults} onChange={handleChange} />
    {errors.priceOfAdults && <div className="invalid-feedback">{errors.priceOfAdults}</div>}
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Price Children</label>
    <input type="number" className="form-control" name="priceOfChildren" value={form.priceOfChildren} onChange={handleChange} />
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Price Infants</label>
    <input type="number" className="form-control" name="priceOfInfants" value={form.priceOfInfants} onChange={handleChange} />
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Duration (Days)</label>
    <input type="text" className="form-control" name="durationInDays" value={form.durationInDays} onChange={handleChange} />
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
    <label className="form-label">Max Slots *</label>
    <input type="number" className={`form-control ${errors.maxSlots ? "is-invalid" : ""}`} name="maxSlots" value={form.maxSlots} onChange={handleChange} />
    {errors.maxSlots && <div className="invalid-feedback">{errors.maxSlots}</div>}
  </div>

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

 
  <div className="col-md-12 mb-3">
    <label className="form-label">Description</label>
    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={2} />
  </div>

  <div className="col-md-12 mb-3">
    <label className="form-label">Note</label>
    <textarea className="form-control" name="note" value={form.note || ""} onChange={handleChange} rows={2} />
  </div>
</div>

          {/* Departure Dates */}
          <div className="col-md-12 mb-3">
  <label className="form-label">Departure Dates</label>
  {form.departureDates.map((item, idx) => (
    <div key={idx} className="input-group mb-2">
      <input
        type="date"
        className="form-control"
        value={
          item.departureDate1
            ? new Date(item.departureDate1).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) =>
          handleArrayChange("departureDates", idx, "departureDate1", e.target.value)
        }
      />
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => removeArrayField("departureDates", idx)}
        disabled={form.departureDates.length === 1}
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() =>
      addArrayField("departureDates", { departureDate1: "" })
    }
  >
    Add Departure Date
  </button>
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
    <div key={idx} className="input-group mb-2 align-items-center">
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
        onChange={e =>
          handleArrayChange("tourMedia", idx, "mediaType", e.target.value)
        }
      />
      <input
        type="text"
        className="form-control"
        placeholder="Media URL"
        value={item.mediaUrl}
        onChange={e =>
          handleArrayChange("tourMedia", idx, "mediaUrl", e.target.value)
        }
      />

      {/* Thêm hình ảnh xem trước nếu có mediaUrl */}
      

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
    onClick={() =>
      addArrayField("tourMedia", {
        mediaFile: null,
        mediaType: "",
        mediaUrl: ""
      })
    }
  >
    Add Media
  </button>
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