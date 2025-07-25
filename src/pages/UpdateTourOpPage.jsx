import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTourOpDetail, updateTourOperator } from "../services/tourOperatorService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../services/imgUploadService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  companyName: "",
  description: "",
  companyLogo: "",
  licenseNumber: "",
  licenseIssuedDate: "",
  taxCode: "",
  establishedYear: "",
  hotline: "",
  website: "",
  facebook: "",
  instagram: "",
  address: "",
  workingHours: "",
  mediaUrl: "",
  UserId: Cookies.get("userId") || "",
};

function UpdateTourOpPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy dữ liệu công ty theo id
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTourOpDetail(id);
        setForm({
          ...initialState,
          ...data,
          UserId: data.userId || Cookies.get("userId") || "",
        });
      } catch (error) {
        toast.error("Không tìm thấy công ty!");
        navigate("/tour-operator");
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý chọn file cho logo
  const handleLogoFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  // Xử lý chọn file cho media
  const handleMediaFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const newErrors = {};
    if (!form.companyName) newErrors.companyName = "Company name is required";
    if (!form.licenseNumber) newErrors.licenseNumber = "License number is required";
    if (!form.establishedYear) newErrors.establishedYear = "Established year is required";
    if (!form.hotline) newErrors.hotline = "Hotline is required";
    if (!form.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }

    try {
      let companyLogoUrl = form.companyLogo;
      let mediaUrl = form.mediaUrl;

      // Nếu có file logo thì upload lên Cloudinary
      if (logoFile) {
        const logoRes = await uploadToCloudinary(logoFile);
        companyLogoUrl = logoRes.secure_url;
      }

      // Nếu có file media thì upload lên Cloudinary
      if (mediaFile) {
        const mediaRes = await uploadToCloudinary(mediaFile);
        mediaUrl = mediaRes.secure_url;
      }

      const submitData = {
        ...form,
        companyLogo: companyLogoUrl,
        mediaUrl: mediaUrl,
      };

      await updateTourOperator(id, submitData);
      toast.success("Company updated successfully!");
      navigate("/tour-operator");
    } catch (error) {
      toast.error("Failed to update company!");
    }
  };

  return (
    <>
     <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <h2 className="breadcrumb-title mb-2">Nhà Điều Hành</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center mb-0">
                      <li className="breadcrumb-item">
                        <a href="home">
                          <FontAwesomeIcon icon={faHome} />
                        </a>
                      </li>
                      <li className="breadcrumb-item">Chỉnh sửa nhà điều hành</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
    
    <div className="container py-5">
      <h2 className="mb-4 text-center">Update Company</h2>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Company Logo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleLogoFileChange}
            />
            {/* Nếu muốn cho phép nhập link thủ công */}
            <input
              type="text"
              className="form-control mt-2"
              name="companyLogo"
              value={form.companyLogo}
              onChange={handleChange}
              placeholder="Or paste image URL here"
            />
            {form.companyLogo && (
              <img
                src={form.companyLogo}
                alt="Logo Preview"
                style={{ maxWidth: 120, maxHeight: 80, marginTop: 8, border: "1px solid #eee" }}
              />
            )}
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">License Number *</label>
            <input
              type="text"
              className={`form-control ${errors.licenseNumber ? "is-invalid" : ""}`}
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={handleChange}
            />
            {errors.licenseNumber && <div className="invalid-feedback">{errors.licenseNumber}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">License Issued Date</label>
            <input
              type="date"
              className="form-control"
              name="licenseIssuedDate"
              value={form.licenseIssuedDate ? form.licenseIssuedDate.slice(0, 10) : ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Tax Code</label>
            <input
              type="text"
              className="form-control"
              name="taxCode"
              value={form.taxCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Established Year *</label>
            <input
              type="number"
              className={`form-control ${errors.establishedYear ? "is-invalid" : ""}`}
              name="establishedYear"
              value={form.establishedYear}
              onChange={handleChange}
            />
            {errors.establishedYear && <div className="invalid-feedback">{errors.establishedYear}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Hotline *</label>
            <input
              type="text"
              className={`form-control ${errors.hotline ? "is-invalid" : ""}`}
              name="hotline"
              value={form.hotline}
              onChange={handleChange}
            />
            {errors.hotline && <div className="invalid-feedback">{errors.hotline}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Website</label>
            <input
              type="text"
              className="form-control"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Facebook</label>
            <input
              type="text"
              className="form-control"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Instagram</label>
            <input
              type="text"
              className="form-control"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Media</label>
            <input
              type="file"
              className="form-control"
              accept="image/*,video/*"
              onChange={handleMediaFileChange}
            />
            {/* Nếu muốn cho phép nhập link thủ công */}
            <input
              type="text"
              className="form-control mt-2"
              name="mediaUrl"
              value={form.mediaUrl}
              onChange={handleChange}
              placeholder="Or paste media URL here"
            />
            {form.mediaUrl && (
              <div>
                <span className="text-muted">Preview:</span>
                <img
                  src={form.mediaUrl}
                  alt="Media Preview"
                  style={{ maxWidth: 120, maxHeight: 80, marginTop: 8, border: "1px solid #eee" }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Address *</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Working Hours</label>
            <input
              type="text"
              className="form-control"
              name="workingHours"
              value={form.workingHours}
              onChange={handleChange}
              placeholder="e.g. Mon-Fri 8:00-17:00"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Update Company
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default UpdateTourOpPage;