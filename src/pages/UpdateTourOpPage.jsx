import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTourOpDetail, updateTourOperator } from "../services/tourOperatorService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../services/imgUploadService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const ADDRESS_OPTIONS = [
  "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Lâm Đồng", "Cà Mau", "Cần Thơ",
  "Khánh Hòa", "Đắk Lắk", "TP. Hồ Chí Minh", "Vĩnh Long", "Sơn La", "Quảng Ninh", "TP. Hải Phòng", "TP. Huế",
  "TP. Đà Nẵng", "Hà Tĩnh", "Cao Bằng", "Lai Châu", "Điện Biên", "Lạng Sơn", "Bắc Giang", "Quảng Bình",
  "Quảng Trị", "Thừa Thiên Huế", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Gia Lai", "Kon Tum", "Ninh Thuận", "Bình Thuận", "TP. Hà Nội"
];

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
  address: [],
  workingHours: "",
  mediaUrl: "",
  UserId: Cookies.get("userId") || "",
};

function UpdateTourOpPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [serverError, setServerError] = useState("");
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
          address: data.address
            ? data.address.split(",").map(a => a.trim()).filter(a => a)
            : [],
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

  // Xử lý chọn địa chỉ (checkbox)
  const handleAddressChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      let addressArr = Array.isArray(prev.address)
        ? prev.address
        : typeof prev.address === "string" && prev.address
        ? prev.address.split(",").map(a => a.trim()).filter(a => a)
        : [];
      if (checked) {
        addressArr = [...addressArr, value];
      } else {
        addressArr = addressArr.filter((addr) => addr !== value);
      }
      // Ghép lại thành string, mỗi cái cách nhau 1 dấu ,
      return { ...prev, address: addressArr.join(", ") };
    });
  };

  // Helper: chia đều địa chỉ thành 5 cột
  const getAddressColumns = () => {
    const columns = [[], [], [], [], []];
    ADDRESS_OPTIONS.forEach((addr, idx) => {
      columns[idx % 5].push({ addr, idx });
    });
    return columns;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    // Validate required fields
    const newErrors = {};
    if (!form.companyName) newErrors.companyName = "Tên công ty là bắt buộc";
    if (!form.licenseNumber) newErrors.licenseNumber = "Số giấy phép là bắt buộc";
    if (!form.establishedYear) newErrors.establishedYear = "Năm thành lập là bắt buộc";
    if (!form.hotline) newErrors.hotline = "Hotline là bắt buộc";
    // Đảm bảo address là string, kiểm tra rỗng
    const addressStr = typeof form.address === "string" ? form.address : (form.address || []).join(", ");
    if (!addressStr || addressStr.trim().length === 0) newErrors.address = "Vui lòng chọn ít nhất một địa chỉ";
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
        address: addressStr,
      };

      await updateTourOperator(id, submitData);
      toast.success("Cập nhật nhà điều hành thành công!");
      navigate("/operator/dashboard");
    } catch (error) {
      let msg = "Không thể cập nhật nhà điều hành!";
      if (error?.response?.data?.message) {
        msg = error.response.data.message;
      }
      setServerError(msg);
      toast.error(msg);
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
        <h2 className="mb-4 text-center">Cập nhật Nhà Điều Hành</h2>
        {serverError && (
          <div className="alert alert-danger text-center">{serverError}</div>
        )}
        <form className="card p-4 shadow" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Tên công ty *</label>
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
              <label className="form-label">Logo công ty</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleLogoFileChange}
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
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Số giấy phép *</label>
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
              <label className="form-label">Ngày cấp giấy phép</label>
              <input
                type="date"
                className="form-control"
                name="licenseIssuedDate"
                value={form.licenseIssuedDate ? form.licenseIssuedDate.slice(0, 10) : ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Mã số thuế</label>
              <input
                type="text"
                className="form-control"
                name="taxCode"
                value={form.taxCode}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Năm thành lập *</label>
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
              {form.mediaUrl && (
                <div>
                  <span className="text-muted">Xem trước:</span>
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
              <label className="form-label">Địa chỉ hoạt động *</label>
              <div className="row">
                {getAddressColumns().map((col, colIdx) => (
                  <div className="col-md-2" key={colIdx}>
                    {col.map(({ addr, idx }) => (
                      <div className="form-check" key={addr}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`addr-${idx}`}
                          value={addr}
                          checked={form.address.includes(addr)}
                          onChange={handleAddressChange}
                        />
                        <label className="form-check-label" htmlFor={`addr-${idx}`}>
                          {addr}
                        </label>
                        {colIdx < 4 && <span>, </span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {errors.address && <div className="text-danger mt-1">{errors.address}</div>}
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Giờ làm việc</label>
              <input
                type="text"
                className="form-control"
                name="workingHours"
                value={form.workingHours}
                onChange={handleChange}
                placeholder="VD: Thứ 2 - Thứ 6, 8:00-17:00"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Cập nhật nhà điều hành
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateTourOpPage;