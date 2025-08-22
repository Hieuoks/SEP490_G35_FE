import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes,FaCartPlus } from "react-icons/fa";
import { getPackages,checkpackage } from "../../../services/packageService";
import Cookies from "js-cookie";
const userId = Cookies.get('userId');
const PublicPackage = () => {
    const [packagesRes, setPackagesRes] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackagesRes(data.data || data);
                console.log("API response:", data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };
        fetchPackages();
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
    const [mypackage,setMyPackage] = useState([]);
    const getMyPackages = async () => {

            await checkpackage(userId).then((res) => {
                setMyPackage(res);
            })
            .catch((error) => {
                setMyPackage([]);
                console.error("Error checking package:", error);
            });   
    };
    useEffect(() => {
        getMyPackages();
    }, []);
    return (
    <div className="content">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="header-section text-center mb-4">
                        <h2 className="mb-2">Chọn gói dịch vụ của bạn</h2>
                    </div>
                </div>
            </div>
            <div>
                <div className="tab-content">
                    {/* <!-- Pricing Plan List Year --> */}
                    <div className="tab-pane fade active show" id="pricing-list-01">
                        <div className="row">
                            {packagesRes.length === 0 ? (
                                <h6>Hiện chưa có gói dịch vụ nào.</h6>
                            ) : (
                                packagesRes
                                    ?.filter((pac) => pac.isActive)
                                    ?.map((pac) => (
                                        <div className="col-lg-4 col-md-6" key={pac.packageId}>
                                            <div className="card flex-fill mb-0">
                                                <div className="card-header">
                                                    <div className="mb-3">
                                                        <div className="mb-2">
                                                            <h4>{pac.name}</h4>
                                                        </div>
                                                        <div className="mb-2">
                                                            <p className="fs-16 text-gray-6">{pac.description}</p>
                                                        </div>
                                                        <div>
                                                            {pac.price === 0 ? (
                                                                <h5 className="fs-32 fw-bold">Miễn phí</h5>
                                                            ) : (
                                                                <h5 className="fs-32 fw-bold">{formatPrice(pac.price)} <span className="fs-16 fw-normal">/năm</span></h5>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {mypackage.packageId === pac.packageId || (mypackage.length === 0 && pac.packageId === 1) ? (
                                                            <button className="btn btn-success d-flex align-items-center justify-content-center" disabled>
                                                                <FaCartPlus className="me-1" /> Gói của bạn
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-dark d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target={`#Buy${pac.packageId}`}>
                                                                <FaCartPlus className="me-1" /> Chọn gói này
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-2">
                                                        <h6 className="fs-16">Tính năng bao gồm</h6>
                                                    </div>
                                                    <div className="pricing-list-items">
                                                        <p className="d-flex align-items-center ">
                                                            <FaCheckCircle className="text-success me-1" />
                                                            Có {pac.maxTour === 0 ? "không giới hạn" : pac.maxTour} tour mỗi tháng
                                                        </p>
                                                        <p className="d-flex align-items-center ">
                                                            <FaCheckCircle className="text-success me-1" />
                                                            Có {pac.maxImage === 0 ? "không giới hạn" : pac.maxImage} ảnh cho mỗi tour
                                                        </p>
                                                        <p className="d-flex align-items-center ">
                                                            {pac.maxVideo ? (
                                                                <FaCheckCircle className="text-success me-1" />
                                                            ) : (
                                                                <FaTimes className="text-danger me-1" />
                                                            )}
                                                            Có thể tải video cho tour
                                                        </p>
                                                        <p className="d-flex align-items-center ">
                                                            {pac.tourGuideFunction ? (
                                                                <FaCheckCircle className="text-success me-1" />
                                                            ) : (
                                                                <FaTimes className="text-danger me-1" />
                                                            )}
                                                            Quản lý hướng dẫn viên
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                    {/* <!-- /Pricing Plan List --> */}
                    {packagesRes.map((pac) => (
                        <div className="modal fade" id={`Buy${pac.packageId}`} key={pac.packageId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Mua {pac.name}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Bạn có chắc chắn muốn mua gói này?</p>
                                        <p>Giá: {pac.price === 0 ? "Miễn phí" : `${formatPrice(pac.price)}`}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        <a className="btn btn-primary" href={`/package/payment/${pac.packageId}`}>Xác nhận mua</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}
export default PublicPackage;