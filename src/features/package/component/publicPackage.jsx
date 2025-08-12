import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { getPackages } from "../../../services/packageService";
const PublicPackage = () => {
    const [packagesRes, setPackagesRes] = useState([]);
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackagesRes(data.items || data);
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
    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="header-section text-center mb-4">
                            <h2 className="mb-2">Choose Your Package</h2>
                        </div>
                    </div>
                </div>
                <div>

                    <div className="tab-content">

                        {/* <!-- Pricing Plan List Year --> */}
                        <div className="tab-pane fade active show" id="pricing-list-01">
                            <div className="row">
                                {packagesRes.length === 0 ? (
                                    <h6>No packages available at the moment.</h6>
                                ) : (
                                    packagesRes
                                        .filter((pac) => pac.isActive)
                                        .map((pac) => (
                                            <div className="col-lg-4 col-md-6" key={pac.packageId}>
                                                <div class="card flex-fill mb-0">
                                                    <div class="card-header">
                                                        <div class="mb-3">
                                                            <div class="mb-2">
                                                                <h4>{pac.name}</h4>
                                                            </div>
                                                            <div class="mb-2">
                                                                <p class="fs-16 text-gray-6">{pac.description}</p>
                                                            </div>
                                                            <div>
                                                                {pac.price === 0 ? (
                                                                    <h5 class="fs-32 fw-bold">Free</h5>
                                                                    ) : (
                                                                    <h5 class="fs-32 fw-bold">{formatPrice(pac.price)} <span class="fs-16 fw-normal">/yearly</span></h5>
                                                                )}
                                                                
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <a href={`/package/payment/${pac.packageId}`}  class="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i class="ms-2 isax isax-arrow-right-3"></i></a>
                                                        </div>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="mb-2">
                                                            <h6 class="fs-16">Features Include</h6>
                                                        </div>
                                                        <div class="pricing-list-items">
                                                            <p class="d-flex align-items-center ">
                                                                <FaCheckCircle className="text-success me-1" />
                                                                Have {pac.maxTour===0?"Infinity":pac.maxTour} tours per months
                                                            </p>
                                                            <p class="d-flex align-items-center ">
                                                                <FaCheckCircle className="text-success me-1" />
                                                                Have {pac.maxImage===0?"Infinity":pac.maxImage} images per tours
                                                            </p>
                                                            <p class="d-flex align-items-center ">
                                                                {pac.tourGuideFunction ? (
                                                                    <FaCheckCircle className="text-success me-1" />
                                                                ) : (
                                                                    <FaTimes className="text-danger me-1" />
                                                                )}
                                                                Can upload your video for your tours
                                                            </p>
                                                            <p class="d-flex align-items-center ">
                                                                {pac.tourGuideFunction ? (
                                                                    <FaCheckCircle className="text-success me-1" />
                                                                ) : (
                                                                    <FaTimes className="text-danger me-1" />
                                                                )}
                                                                Manage your tourguide
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
                        {packagesRes.filter((pac) => pac.isActive).map((pac) => (
                            <div className="modal fade" id={`Buy${pac.packageId}`} key={pac.packageId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Buy {pac.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {/* Add your form or content for buying the package here */}
                                            <p>Are you sure you want to buy this package?</p>
                                            <p>Price: ${pac.price}</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Confirm Purchase</button>
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