import React, { useState, useEffect } from "react";
import { getPackages, updatePackage, createPackage,updatePackageStatus } from "../../../services/packageService";
import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPencilAlt } from "react-icons/fa";
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
        packageId: '', name: '', price: 0, maxTour: 0,maxImage:0 ,maxVideo:false,tourGuideFunction:false,discountPercentage: 0, description: ''
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        const numberRegex = /^\d+$/;

        if (!numberRegex.test(formData.price)) {
            newErrors.price = 'price must be a number and greater than or equal 0';
        }
        if (!numberRegex.test(formData.maxTour)) {
            newErrors.maxTour = 'maxTours must be a number and greater than or equal 0';
        }
        if (!numberRegex.test(formData.maxImage)) {
            newErrors.maxImage = 'maxImage must be a number and greater than or equal 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'maxVideo' || name === 'tourGuideFunction' ? value === 'true'? true :false : value
        }));
    };
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updatePackage(formData)
                .then(response => {
                    console.log('Form is valid:', formData);
                    setFormData({
                        packageId: '', name: '', price: 0, maxTour: 0,maxImage:0 ,maxVideo:false,tourGuideFunction:false,discountPercentage: 0, description: ''
                    });
                    toast.success('Update package successfully!');
                    fetchPackages();
                    setErrors({});
                    navigate('/admin/packages');
                })
                .catch(error => {
                    console.error('Update package failed:', error);
                    console.error('request data:', formData);
                    toast.error('Update package failed.');
                    setErrors({ api: 'Update package failed. Please try again.' });
                });
            
            // Redirect to profile settings page after successful update
        }
    };
    
    const handleCreatePackage = (e) => {
        e.preventDefault();
        if (validate()) {
            createPackage(formData)
                .then(response => {
                    console.log('Create package successfull:', response);
                    setFormData({
                        packageId: '', name: '', price: 0, maxTour: 0,maxImage:0 ,maxVideo:false,tourGuideFunction:false,discountPercentage: 0, description: ''
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
    const hanldeUpdateStatus = (e) => {
        e.preventDefault();
        updatePackageStatus(formData.packageId)
            .then(response => {
                console.log('Update package status successfull:', response);
                toast.success('Update package status successfully!');
                setFormData({
                    packageId: '', name: '', price: 0, maxTour: 0,maxImage:0 ,maxVideo:false,tourGuideFunction:false,discountPercentage: 0, description: ''
                });
                fetchPackages();
                setErrors({});
                navigate('/admin/packages');
            })
            .catch(error => {
                console.error('Update package status failed:', error);
                toast.error('Update package status failed.');
                setErrors({ api: 'Update package status failed. Please try again.' });
            });
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
                                                        <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Active
                                                        </span>
                                                    ):(
                                                        <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Inactive
                                                        </span>
                                                    )}

                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${pac.packageId}`} className="me-3" onClick={(e) => {
                                                        setFormData({packageId: pac.packageId, name: pac.name, price: pac.price, maxTour: pac.maxTour, maxImage: pac.maxImage, maxVideo: pac.maxVideo, tourGuideFunction: pac.tourGuideFunction, description: pac.description});
                                                    }}> 
                                                        <FaEye />
                                                    </a>
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#Update${pac.packageId}`} 
                                                        onClick={(e) => {
                                                            setFormData({packageId: pac.packageId, name: pac.name, price: pac.price, maxTour: pac.maxTour, maxImage: pac.maxImage, maxVideo: pac.maxVideo, tourGuideFunction: pac.tourGuideFunction, description: pac.description});
                                                        }}
                                                        
                                                    >
                                                        <FaEdit className="ms-2" />
                                                    </a>
                                                </div>
                                                
                                                
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
                                                    <h6 className="fs-14">Status</h6>
                                                    { pac.isActive ? (
                                                        <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Active
                                                        </span>
                                                    ):(
                                                        <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Inactive
                                                        </span>
                                                    )}
                                                    
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

                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Feature Info</h6>
                                            <div className="row gy-3">
                                                <div className="col-lg-12">
                                                    {/* <h6 className="fs-14">Name</h6> */}
                                                    <p className="text-gray-6 fs-16 "> - Have {pac.maxTour} tours per year </p>
                                                    <p className="text-gray-6 fs-16 "> - Have {pac.maxImage} image per tour create </p>
                                                    <p className="text-gray-6 fs-16 "> - {pac.maxVideo?"Each tour can have video for introducing about this tour":"You cannot upload video for tour"} </p>
                                                    <p className="text-gray-6 fs-16 "> - {pac.tourGuideFunction?"You can manage your tourguide include (create,delete,add tour guide in daparture date)":"You cannot manage tour guide"} </p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn btn-md btn-primary" onClick={hanldeUpdateStatus}>{pac.isActive?"Inactive":"Active"}</a>
                                </div>
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
                                        <div className="upcoming-content">

                                            <div className="upcoming-details ">
                                                <h6 className="mb-2">General Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Name</h6>
                                                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Price</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="price" min={0} className="form-control" value={formData.price} onChange={handleChange} />
                                                            <span className="input-group-text">$</span>
                                                            {errors.price && <div className="text-danger fs-14 mt-1">{errors.price}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Max Tour</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxTour" min={0} className="form-control" value={formData.maxTour} onChange={handleChange} />
                                                            {errors.maxTour && <div className="text-danger fs-14 mt-1">{errors.maxTour}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Max Image</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxImage" min={0} className="form-control" value={formData.maxImage} onChange={handleChange} />
                                                            {errors.maxImage && <div className="text-danger fs-14 mt-1">{errors.maxImage}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Allow Video</h6>
                                                        <select name="maxVideo" className="form-select" value={formData.maxVideo} onChange={handleChange}>
                                                            <option value={true}>Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                        {errors.maxVideo && <div className="text-danger fs-14 mt-1">{errors.maxVideo}</div>}
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14"> Manage TourGuide Function</h6>
                                                        <select name="tourGuideFunction" className="form-select" value={formData.tourGuideFunction} onChange={handleChange}>
                                                            <option value={true}>Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                        {errors.tourGuideFunction && <div className="text-danger fs-14 mt-1">{errors.tourGuideFunction}</div>}
                                                            
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Description</h6>
                                                <div className="d-flex align-items-center">
                                                    <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleChange}></textarea>

                                                    {/* <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Blankets & Pillows</span> */}
                                                </div>
                                            </div>

                                            
                                        </div>
                                        <div className="modal-footer">
                                            <button data-bs-dismiss="modal" className="btn btn-md btn-primary" onClick={handleUpdateSubmit}>Save</button>
                                        </div>
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
                                        <div className="upcoming-content">

                                            <div className="upcoming-details ">
                                                <h6 className="mb-2">General Info</h6>
                                                <div className="row gy-3">
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Name</h6>
                                                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Price</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="price" min={0} value={formData.price} className="form-control" onChange={handleChange} />
                                                            <span className="input-group-text">$</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Max Tour</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxTour" min={0} value={formData.maxTour} className="form-control" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h6 className="fs-14">Max Image</h6>
                                                        <div className="input-group">
                                                            <input type="number" name="maxImage" min={0} value={formData.maxImage} className="form-control" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14">Allow Video</h6>
                                                        <select name="maxVideo" className="form-select" value={formData.maxVideo} onChange={handleChange}>
                                                            <option value={true}>Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14"> Manage TourGuide Function</h6>
                                                        <select name="tourGuideFunction" className="form-select" value={formData.tourGuideFunction}  onChange={handleChange}>
                                                            <option value={true}>Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                            
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Description</h6>
                                                <div className="d-flex align-items-center">
                                                    <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleChange}></textarea>

                                                    {/* <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">Blankets & Pillows</span> */}
                                                </div>
                                            </div>

                                            
                                        </div>
                                        <div className="modal-footer">
                                            <button data-bs-dismiss="modal"  onClick={handleCreatePackage} className="btn btn-md btn-primary">Add</button>
                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
        </div>

    );
}
export default AdminListPackages;
