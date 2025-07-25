import React, { useState, useEffect } from "react";
import { getPackages, updatePackage, createPackage } from "../../../services/packageService";
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AdminListPackages = () => {
    const [packagesRes, setPackagesRes] = useState([]);
    const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackagesRes(data.items || data);
                console.log("API response:", data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };
    useEffect(() => {
        fetchPackages();
    }, []);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        packageId: '', name: '', price: 0, maxTours: 0, durationInYears: 0, discountPercentage: 0, description: ''
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        const numberRegex = /^\d+$/;

        if (!numberRegex.test(formData.price)) {
            newErrors.price = 'price must be a number and greater than or equal 0';
        }
        if (!numberRegex.test(formData.maxTours)) {
            newErrors.maxTours = 'maxTours must be a number and greater than or equal 0';
        }
        if (!numberRegex.test(formData.discountPercentage)) {
            newErrors.discountPercentage = 'discount must be a number and greater than or equal 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updatePackage(formData)
                .then(response => {
                    console.log('Update package successful:', response);
                    setFormData({
                        packageId: '', name: '', price: 0, maxTours: 0, durationInYears: 0, discountPercentage: 0, description: ''
                    });
                    toast.success('Update package successfully!');
                    fetchPackages();
                    setErrors({});
                    navigate('/admin/packages');
                })
                .catch(error => {
                    console.error('Update package failed:', error);
                    toast.error('Update package failed.');
                    setErrors({ api: 'Update package failed. Please try again.' });
                });
            console.log('Form is valid:', formData);
            // Redirect to profile settings page after successful update
        }
    };
    const handleClickUpdate = (e) => {
        if (packagesRes) {
            setFormData({
                packageId: e.target.getAttribute('data-packageid'),
                name: e.target.getAttribute('data-name'),
                price: e.target.getAttribute('data-price'),
                maxTours: e.target.getAttribute('data-maxtours'),
                discountPercentage: e.target.getAttribute('data-discountpercentage'),
                description: e.target.getAttribute('data-description')
            });
        }
    }
    const handleCreatePackage = (e) => {
        e.preventDefault();
        if (validate()) {
            createPackage(formData)
                .then(response => {
                    console.log('Create package successfull:', response);
                    setFormData({
                        packageId: '', name: '', price: 0, maxTours: 0, durationInYears: 0, discountPercentage: 0, description: ''
                    });
                    toast.success('Create package successfully!');
                    fetchPackages();
                    setErrors({});
                    navigate('/admin/packages');
                })
                .catch(error => {
                    console.error('Create package failed:', error);
                    toast.error('Create package failed.');
                    setErrors({ api: 'Create package failed. Please try again.' });
                });
            console.log('Form is valid:', formData);
        }
    }
    return (
        <div className="col-xl-9 col-lg-8 theiaStickySidebar">

            {/* <!-- Booking Header --> */}
            <div className="card booking-header">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                    <div>
                        <h6>Packages</h6>
                        <p className="fs-14 text-gray-6 fw-normal ">Total : {packagesRes.length}</p>

                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <button className="btn btn-primary me-0" data-bs-toggle="modal" data-bs-target="#addPackage">Add Package</button>
                    </div>
                </div>
            </div>
            {/* <!-- /Booking Header --> */}

            {/* <!-- Car-Booking List --> */}
            <div className="card hotel-list">
                <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="">Packages List</h6>

                    </div>

                    {/* <!-- Hotel List --> */}
                    <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packagesRes.length === 0 ? (
                                    <tr>No packages available at the moment.</tr>
                                ) : (
                                    packagesRes
                                    .sort((a, b) => (b.isActive === true) - (a.isActive === true))
                                    .map((pac) => (
                                        <tr key={pac.packageId}>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">#{pac.packageId}</a></td>
                                            <td>
                                                <h6 className="fs-14 mb-1">{pac.name}</h6>
                                            </td>
                                            <td>${pac.price}</td>
                                            <td>
                                                { pac.isActive ? (
                                                    <h6 className="fs-14 mb-1">Active</h6>
                                                ):(
                                                    <div>Inactive</div>
                                                )}

                                            </td>
                                            <td>

                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${pac.packageId}`}>
                                                    <span  className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i class="fa-solid fa-circle fs-5 me-1"></i>View</span>
                                                </a>
                                                <br></br>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#Update${pac.packageId}`} >
                                                    <button className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"
                                                        onClick={handleClickUpdate}
                                                        data-packageid={pac.packageId} data-name={pac.name}
                                                        data-price={pac.price} data-maxtours={pac.maxTours}
                                                        data-discountpercentage={pac.discountPercentage} data-description={pac.description}>
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Update
                                                    </button>
                                                </a>
                                                <br></br>
                                                {pac.isActive ? (
                                                    <button type="submit" className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10"><i class="fa-solid fa-circle fs-5 me-1"></i>Inactive</button>
                                                ):(
                                                    <button type="submit" className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10" ><i class="fa-solid fa-circle fs-5 me-1"></i>Active</button>
                                                )}
                                            </td>
                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#upcoming"> <FontAwesomeIcon icon={faEye} /></a>
                                                </div>
                                            </td> */}

                                        </tr>

                                    ))

                                )}


                            </tbody>
                        </table>
                    </div>
                    {/* <!-- /Hotel List --> */}

                </div>
            </div>
            {/* <!-- /Car-Booking List --> */}
            {packagesRes.length === 0 ? (
                <div>No content</div>
            ) : packagesRes.map((pac) => (
                <div key={pac.packageId}>
                    <div className="modal fade" id={`View${pac.packageId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Package Info <span className="fs-14 fw-medium text-primary">#{pac.packageId}</span></h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>
                                <div className="modal-body">
                                    <div className="upcoming-content">

                                        <div className="upcoming-details ">
                                            <h6 className="mb-2">General Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Name</h6>
                                                    <p className="text-gray-6 fs-16 ">{pac.name}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Price</h6>
                                                    <p className="text-gray-6 fs-16 ">${pac.price}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Max tour</h6>
                                                    <p className="text-gray-6 fs-16 ">{pac.maxTours} </p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Discount</h6>
                                                    <p className="text-gray-6 fs-16 ">{pac.discountPercentage}% </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Description</h6>
                                            <div className="d-flex align-items-center">
                                                <p className="text-gray-6 fs-16 ">{pac.description}</p>
                                                {/* <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Blankets & Pillows</span> */}
                                            </div>
                                        </div>

                                        {/* <div className="upcoming-details">
                                            <h6 className="mb-2">Billing Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Name</h6>
                                                    <p className="text-gray-6 fs-16 ">Chris Foxy</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Email</h6>
                                                    <p className="text-gray-6 fs-16 "><a href="https://dreamstour.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d1b2b9a3b7bee3e2e4e791b4a9b0bca1bdb4ffb2bebc">[email&#160;protected]</a></p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Phone</h6>
                                                    <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Address</h6>
                                                    <p className="text-gray-6 fs-16 ">15/C Prince Dareen Road, New York</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Order Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Order Id</h6>
                                                    <p className="text-primary fs-16 ">#45669</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Payment Method</h6>
                                                    <p className="text-gray-6 fs-16 ">Credit Card (Visa)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Payment Status</h6>
                                                    <p className="text-success fs-16 ">Paid</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Date of Payment</h6>
                                                    <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Tax</h6>
                                                    <p className="text-gray-6 fs-16 ">15% ($60)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Discount</h6>
                                                    <p className="text-gray-6 fs-16 ">20% ($15)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Booking Fees</h6>
                                                    <p className="text-gray-6 fs-16 ">$25</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Total Paid</h6>
                                                    <p className="text-gray-6 fs-16 ">$6569</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="modal-footer">
                                    <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-toggle="modal" data-bs-target="#cancel-booking">Cancel Booking</a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={`Update${pac.packageId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Update package <span className="fs-14 fw-medium text-primary">#{pac.packageId}</span></h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleUpdateSubmit}>
                                        <div className="upcoming-content">

                                            <div className="upcoming-details ">
                                                <h6 className="mb-2">General Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Name</h6>
                                                        <input type="text" name="name" className="form-control" defaultValue={pac.name} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Price</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="price" min={0} className="form-control" defaultValue={pac.price} onChange={handleChange} />
                                                            <span className="input-group-text">$</span>
                                                            {errors.price && <div className="text-danger fs-14 mt-1">{errors.price}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Max Tour</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxTours" min={0} className="form-control" defaultValue={pac.maxTours} onChange={handleChange} />
                                                            {errors.maxTours && <div className="text-danger fs-14 mt-1">{errors.maxTours}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Discount</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="discountPercentage" min={0} className="form-control" defaultValue={pac.discountPercentage} onChange={handleChange} />
                                                            <span className="input-group-text">%</span>
                                                            {errors.discountPercentage && <div className="text-danger fs-14 mt-1">{errors.discountPercentage}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Description</h6>
                                                <div className="d-flex align-items-center">
                                                    <textarea name="description" className="form-control" rows="4" defaultValue={pac.description} onChange={handleChange}></textarea>

                                                    {/* <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Blankets & Pillows</span> */}
                                                </div>
                                            </div>

                                            {/* <div className="upcoming-details">
                                            <h6 className="mb-2">Billing Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Name</h6>
                                                    <p className="text-gray-6 fs-16 ">Chris Foxy</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Email</h6>
                                                    <p className="text-gray-6 fs-16 "><a href="https://dreamstour.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d1b2b9a3b7bee3e2e4e791b4a9b0bca1bdb4ffb2bebc">[email&#160;protected]</a></p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Phone</h6>
                                                    <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Address</h6>
                                                    <p className="text-gray-6 fs-16 ">15/C Prince Dareen Road, New York</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Order Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Order Id</h6>
                                                    <p className="text-primary fs-16 ">#45669</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Payment Method</h6>
                                                    <p className="text-gray-6 fs-16 ">Credit Card (Visa)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Payment Status</h6>
                                                    <p className="text-success fs-16 ">Paid</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Date of Payment</h6>
                                                    <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Tax</h6>
                                                    <p className="text-gray-6 fs-16 ">15% ($60)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Discount</h6>
                                                    <p className="text-gray-6 fs-16 ">20% ($15)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Booking Fees</h6>
                                                    <p className="text-gray-6 fs-16 ">$25</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Total Paid</h6>
                                                    <p className="text-gray-6 fs-16 ">$6569</p>
                                                </div>
                                            </div>
                                        </div> */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" data-bs-dismiss="modal" className="btn btn-md btn-primary">Save</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            ))

            }

            <div className="modal fade" id="addPackage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Create package</h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleCreatePackage}>
                                        <div className="upcoming-content">

                                            <div className="upcoming-details ">
                                                <h6 className="mb-2">General Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Name</h6>
                                                        <input type="text" name="name" className="form-control" onChange={handleChange} />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Price</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="price" min={0} className="form-control" onChange={handleChange} />
                                                            <span className="input-group-text">$</span>
                                                            {errors.price && <div className="text-danger fs-14 mt-1">{errors.price}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Max Tour</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxTours" min={0} className="form-control" onChange={handleChange} />
                                                            {errors.maxTours && <div className="text-danger fs-14 mt-1">{errors.maxTours}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Discount</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="discountPercentage" min={0} className="form-control"  onChange={handleChange} />
                                                            <span className="input-group-text">%</span>
                                                            {errors.discountPercentage && <div className="text-danger fs-14 mt-1">{errors.discountPercentage}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Description</h6>
                                                <div className="d-flex align-items-center">
                                                    <textarea name="description" className="form-control" rows="4" onChange={handleChange}></textarea>

                                                    {/* <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Blankets & Pillows</span> */}
                                                </div>
                                            </div>

                                            
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" data-bs-dismiss="modal" className="btn btn-md btn-primary">Add</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
        </div>

    );
}
export default AdminListPackages;
