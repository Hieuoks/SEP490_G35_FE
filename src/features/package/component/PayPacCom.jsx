import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { PurchasePackage, getDetailPac } from "../../../services/paymentPacService";
import { useParams } from "react-router-dom"; // Thêm import này
import { toast } from "react-toastify"; // Thêm import này nếu chưa có
import mbBank from "../../../assets/img/logo-mbbank.png"
import Cookies from "js-cookie";
const PayPacCom = () => {
    const [packagesRes, setPackagesRes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { packageId } = useParams();
    const userid = Cookies.get("userId");
    const [number, setNumber] = useState(1);
    const [urlQR, setUrlQR] = useState("https://img.vietqr.io/image/MB-260220032602-compact.png");
    const [content, setContent] = useState("");
    const fetchPackageDetail = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching package detail for ID:", packageId);
            const data = await getDetailPac(packageId); // Truyền packageId vào hàm
            setPackagesRes(data.data);
            console.log("API response:", data);

        } catch (error) {
            console.error("Error fetching package detail:", error);
            setError("Không thể tải thông tin package");
            toast.error("Lỗi khi tải thông tin package");
        } finally {
            setLoading(false);
        }
    };
    // useEffect để gọi API khi component mount
    useEffect(() => {
        if (packageId) {
            fetchPackageDetail();
        }
    }, []);
    const formatPrice = (price) => {
        if (!price) return '0 VND';

        const num = parseFloat(price);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M VND`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}K VND`;
        } else {
            return `${num.toLocaleString()} VND`;
        }
    };
    const handleRefresh = () => {
        fetchPackageDetail();
    };

    const handleConfirm = (amount) => {
        setUrlQR(`https://img.vietqr.io/image/MB-260220032602-compact.png` + `?amount=${packagesRes.price * number}&addInfo=${content}`);
        console.log("request:", userid, packageId, amount, number);
        PurchasePackage(userid, packageId, amount, "QR", number)
            .then((res) => {
                console.log("res:", res);
                setContent(res.contentCode);
            })
            .catch((err) => {
                console.log("error", err);
            })
    }
    // Loading state
    if (loading) {
        return (
            <div className="content content-two">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Đang tải thông tin package...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // Error state
    if (error) {
        return (
            <div className="content content-two">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="alert alert-danger">
                                        <h5>Lỗi</h5>
                                        <p>{error}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleRefresh}
                                        >
                                            Thử lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (

    <div className="content content-two">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card payment-details">
                        <div className="card-header">
                            <h5>Chi tiết thanh toán</h5>
                        </div>
                        <div className="card-body">

                            <div className="credit-card-details ">
                                <div className="mb-3">
                                    <h6 className="fs-16 ">Thanh toán bằng mã QR</h6>
                                </div>

                                <div className="card-form ">
                                    <div className="row">

                                        <div className="col-lg-12 border-bottom mb-3">
                                            <div className="mb-3">
                                                <h6 className="text-primary mb-3">Thông tin thanh toán</h6>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <h6 className="fs-16">Số năm</h6>
                                                    <p className="fs-16">
                                                        <select defaultValue={1} className="form-select form-select-sm" onChange={(e) => {
                                                            setNumber(e.target.value)
                                                        }} >
                                                            <option value={1} >1 </option>
                                                            <option value={2} >2 </option>
                                                            <option value={3} >3 </option>
                                                            <option value={4} >4 </option>
                                                            <option value={5} >5 </option>
                                                            <option value={6} >6 </option>
                                                            <option value={7} >7 </option>
                                                            <option value={8} >8 </option>
                                                            <option value={9} >9 </option>
                                                            <option value={10} >10 </option>
                                                        </select>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <h6 className="fs-16">Giá mỗi năm</h6>
                                                    <p className="fs-16">{packagesRes.price === 0 ? "Miễn phí" : `${formatPrice(packagesRes.price)}`}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 ">
                                            <div className="mb-3">
                                                <h6>Số tiền cần thanh toán</h6>
                                                <h6 className="text-primary">{formatPrice(packagesRes.price * number)}</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ">
                                            <div className="mb-3">
                                                <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
                                                    <a href="javascript:void(0);" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#booking-success" onClick={() => {
                                                        handleConfirm(packagesRes.price)
                                                    }}> Xác nhận </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-4 theiaStickySidebar">
                    <div className="card order-details">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between header-content">
                                <h5>Chi tiết gói</h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="pb-3 border-bottom">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h6 className="mb-2">{packagesRes.name}</h6>
                                    <h6 className="mb-2">{packagesRes.price === 0 ? "Miễn phí" : `${formatPrice(packagesRes.price)}/năm`}</h6>
                                </div>
                            </div>
                            <div className="mt-3 pb-3 border-bottom">
                                <h6 className="text-primary mb-3">Thông tin gói</h6>
                                <div className="d-flex align-items-center details-info">
                                    <FaCheckCircle className="text-success me-1" />
                                    Có {packagesRes.maxTour === 0 ? "không giới hạn" : packagesRes.maxTour} tour mỗi tháng
                                </div>
                                <div className="d-flex align-items-center  details-info">
                                    <FaCheckCircle className="text-success me-1" />
                                    Có {packagesRes.maxImage === 0 ? "không giới hạn" : packagesRes.maxImage} ảnh cho mỗi tour
                                </div>
                                <div className="d-flex align-items-center details-info">
                                    {packagesRes.maxVideo ? (
                                        <FaCheckCircle className="text-success me-1" />
                                    ) : (
                                        <FaTimes className="text-danger me-1" />
                                    )}
                                    Có thể tải video cho tour
                                </div>
                                <div className="d-flex align-items-center details-info">
                                    {packagesRes.tourGuideFunction ? (
                                        <FaCheckCircle className="text-success me-1" />
                                    ) : (
                                        <FaTimes className="text-danger me-1" />
                                    )}
                                    Quản lý hướng dẫn viên
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="booking-success" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content booking-success-modal">
                    <div className="modal-body">
                        <div>
                            <div className="modal-header mb-3">
                                <h5>Thông tin thanh toán</h5>
                                <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="payment-info">

                                        <div className="bank-info mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <img src={mbBank} alt="MB Bank" className="me-3" style={{ width: '40px', height: '40px' }} />
                                                <div>
                                                    <h6 className="mb-1">MB Bank</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="transfer-details">
                                            <div className="detail-item mb-3">
                                                <label className="form-label fw-medium">Số tài khoản:</label>
                                                <h6 className="fs-16">260220032602</h6>
                                            </div>

                                            <div className="detail-item mb-3">
                                                <label className="form-label fw-medium">Chủ tài khoản:</label>
                                                <h6 className="fs-16">Đỗ Tuấn Đạt</h6>
                                            </div>

                                            <div className="detail-item mb-3">
                                                <label className="form-label fw-medium">
                                                    Nội dung chuyển khoản
                                                </label>
                                                <h6 className="fs-16">{content}</h6>
                                            </div>

                                            <div className="detail-item mb-4">
                                                <h6 className="form-label fw-medium">Số tiền:</h6>
                                                <h6 className="fs-16">{packagesRes.price * number} VND</h6>
                                            </div>

                                            <div className="alert alert-info">
                                                <i className="fas fa-info-circle me-2"></i>
                                                <strong>Lưu ý:</strong> Vui lòng không thay đổi nội dung hoặc số tiền sau khi quét mã QR.
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="qr-code-section text-center">

                                        <div className="qr-container mb-4">
                                            {/* QR Code Image */}
                                            <div className="qr-code-wrapper">
                                                <img
                                                    src={urlQR}
                                                    alt="MB Bank QR Code"
                                                    className="img-fluid"
                                                    style={{ maxWidth: '250px', height: 'auto' }}
                                                />
                                            </div>

                                            {/* Fallback nếu không có QR code */}
                                            <div className="qr-placeholder" style={{ display: 'none' }}>
                                                <div className="bg-light border rounded p-4" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                                                    <div className="d-flex align-items-center justify-content-center h-100">
                                                        <div className="text-center">
                                                            <i className="fas fa-qrcode text-muted" style={{ fontSize: '4rem' }}></i>
                                                            <p className="text-muted mt-2">Không có mã QR</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="qr-instructions">
                                            <h6 className="mb-3">Hướng dẫn thanh toán bằng mã QR:</h6>
                                            <div className="steps">
                                                <div className="step-item d-flex align-items-center mb-2">
                                                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '25px', height: '25px', fontSize: '12px' }}>
                                                        1
                                                    </div>
                                                    <span>Mở ứng dụng ngân hàng của bạn</span>
                                                </div>
                                                <div className="step-item d-flex align-items-center mb-2">
                                                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '25px', height: '25px', fontSize: '12px' }}>
                                                        2
                                                    </div>
                                                    <span>Chọn chức năng quét mã QR</span>
                                                </div>
                                                <div className="step-item d-flex align-items-center mb-2">
                                                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '25px', height: '25px', fontSize: '12px' }}>
                                                        3
                                                    </div>
                                                    <span>Quét mã QR bên cạnh</span>
                                                </div>
                                                <div className="step-item d-flex align-items-center">
                                                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '25px', height: '25px', fontSize: '12px' }}>
                                                        4
                                                    </div>
                                                    <span>Xác nhận và hoàn tất thanh toán</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="alert alert-warning">
                                                <i className="fas fa-exclamation-triangle me-2"></i>
                                                <strong>Lưu ý:</strong> Đảm bảo nội dung chuyển khoản chính xác.
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
                                            <a href="/operator/package" className="btn btn-primary" > Hoàn thành </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
);
}
export default PayPacCom;