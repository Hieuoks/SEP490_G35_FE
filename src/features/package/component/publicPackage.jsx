import React, { useState, useEffect } from "react";
import { getPackages } from "../../../services/packageService";
const PublicPackage = ()=> {
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
                {/* <div className="place-nav pricing-plan-tab">
                    <div className="nav justify-content-center">
                        <div className="tab-btn d-flex align-items-center">
                            <div>
                                <a href="javascript:void(0);" className="nav-link active" data-bs-toggle="tab" data-bs-target="#pricing-list-01">
									Monthly
								</a>
                            </div>
                            <div>
                                <a href="javascript:void(0);" className="nav-link" data-bs-toggle="tab" data-bs-target="#pricing-list-02">
									Yearly
								</a>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="tab-content">
                    
                    {/* <!-- Pricing Plan List Year --> */}
                    <div className="tab-pane fade active show" id="pricing-list-01">
                        <div className="row">
                            {packagesRes.length === 0 ? (
                                <h6>No packages available at the moment.</h6>
                            ):(
                                packagesRes
                                .filter((pac) => pac.isActive)
                                .map((pac)=>(
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
                                                <h5 class="fs-32 fw-bold">${pac.price} <span class="fs-16 fw-normal">/yearly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0); " class="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i class="ms-2 isax isax-arrow-right-3"></i></a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-2">
                                            <h6 class="fs-16">Features Include</h6>
                                        </div>
                                        <div class="pricing-list-items">
                                            <p class="d-flex align-items-center "><i class="isax isax-tick-circle5 text-gray-1 me-1"></i>Discount {pac.discountPercentage}% </p>
                                            <p class="d-flex align-items-center "><i class="isax isax-tick-circle5 text-gray-1 me-1"></i>Create max {pac.maxTours} tours per Monthly</p>
                                            {/* <p class="d-flex align-items-center "><i class="isax isax-tick-circle5 text-gray-1 me-1"></i>Email support</p>
                                            <p class="d-flex align-items-center "><i class="isax isax-tick-circle5 text-gray-1 me-1"></i>Weekday support</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))
                            )}
                            
                        </div>

                    </div>
                    {/* <!-- /Pricing Plan List --> */}

                    

                </div>
            </div>

        </div>
    </div>
    )
}
export default PublicPackage  ;