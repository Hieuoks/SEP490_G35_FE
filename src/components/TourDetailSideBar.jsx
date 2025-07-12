import React, { useState } from "react";

function TourSidebar() {
  // State for increment fields
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(1);
  const [children, setChildren] = useState(1);

  // Handlers for increment/decrement
  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => setter(value > 1 ? value - 1 : 1);

  return (
    <div className="col-xl-4 theiaStickySidebar">
      {/* Tour Details */}
      <div className="card bg-light-200">
        <div className="card-body">
          <h5 className="d-flex align-items-center fs-18 mb-3">
            <span className="avatar avatar-md rounded-circle bg-primary me-2">
              <i className="isax isax-signpost5"></i>
            </span>
            Tour Details
          </h5>
          <div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Date</h6>
              <p className="flex-fill">25 May 2025 - 31 May 2025</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Destination</h6>
              <p className="flex-fill">Eidnesburg</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Duration</h6>
              <p className="flex-fill">4 Day, 3 Night</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Departure</h6>
              <p className="flex-fill">25 May 2025, 04:45 AM</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Return</h6>
              <p className="flex-fill">31 May 2025, 10:00 PM</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Total Peoples</h6>
              <p className="flex-fill">28</p>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Card */}
      <div className="card shadow-none">
        <div className="card-body">
          <div className="mb-3">
            <p className="fs-13 fw-medium mb-1">Starts From</p>
            <h5 className="text-primary mb-1">
              $500 <span className="fs-14 text-default fw-normal">/ Night</span>
            </h5>
          </div>
          <div className="banner-form">
            <form>
              <div className="form-info border-0">
                <div className="form-item border rounded p-3 mb-3 w-100">
                  <label className="form-label fs-14 text-default mb-0">From</label>
                  <input type="text" className="form-control datetimepicker" defaultValue="21-10-2025" />
                  <p className="fs-12">Monday</p>
                </div>
                <div className="form-item border rounded p-3 mb-3 w-100">
                  <label className="form-label fs-14 text-default mb-0">To</label>
                  <input type="text" className="form-control datetimepicker" defaultValue="21-10-2025" />
                  <p className="fs-12">Monday</p>
                </div>
                <div className="card shadow-none mb-3">
                  <div className="card-body p-3 pb-0">
                    <div className="border-bottom pb-2 mb-2">
                      <h6>Details</h6>
                    </div>
                    <div className="custom-increment">
                      {/* Adults */}
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <label className="form-label text-gray-9 mb-0">Adults</label>
                        <div className="custom-increment">
                          <div className="input-group">
                            <span className="input-group-btn float-start">
                              <button type="button" className="quantity-left-minus btn btn-light btn-number" onClick={() => handleDecrement(setAdults, adults)}>
                                <span>
                                  <i className="isax isax-minus"></i>
                                </span>
                              </button>
                            </span>
                            <input type="text" name="adults" className="input-number" value={adults.toString().padStart(2, "0")} readOnly />
                            <span className="input-group-btn float-end">
                              <button type="button" className="quantity-right-plus btn btn-light btn-number" onClick={() => handleIncrement(setAdults, adults)}>
                                <span>
                                  <i className="isax isax-add"></i>
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Infants */}
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <label className="form-label text-gray-9 mb-0">
                          Infants <span className="text-default fw-normal">( 0-12 Yrs )</span>
                        </label>
                        <div className="custom-increment">
                          <div className="input-group">
                            <span className="input-group-btn float-start">
                              <button type="button" className="quantity-left-minus btn btn-light btn-number" onClick={() => handleDecrement(setInfants, infants)}>
                                <span>
                                  <i className="isax isax-minus"></i>
                                </span>
                              </button>
                            </span>
                            <input type="text" name="infants" className="input-number" value={infants.toString().padStart(2, "0")} readOnly />
                            <span className="input-group-btn float-end">
                              <button type="button" className="quantity-right-plus btn btn-light btn-number" onClick={() => handleIncrement(setInfants, infants)}>
                                <span>
                                  <i className="isax isax-add"></i>
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Children */}
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <label className="form-label text-gray-9 mb-0">
                          Children <span className="text-default fw-normal">( 2-12 Yrs )</span>
                        </label>
                        <div className="custom-increment">
                          <div className="input-group">
                            <span className="input-group-btn float-start">
                              <button type="button" className="quantity-left-minus btn btn-light btn-number" onClick={() => handleDecrement(setChildren, children)}>
                                <span>
                                  <i className="isax isax-minus"></i>
                                </span>
                              </button>
                            </span>
                            <input type="text" name="children" className="input-number" value={children.toString().padStart(2, "0")} readOnly />
                            <span className="input-group-btn float-end">
                              <button type="button" className="quantity-right-plus btn btn-light btn-number" onClick={() => handleIncrement(setChildren, children)}>
                                <span>
                                  <i className="isax isax-add"></i>
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Why Book With Us */}
      <div className="card shadow-none">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Why Book With Us</h5>
          <div>
            <p className="d-flex align-items-center mb-3">
              <i className="isax isax-medal-star text-primary me-2"></i>Expertise and Experience
            </p>
            <p className="d-flex align-items-center mb-3">
              <i className="isax isax-menu text-primary me-2"></i>Tailored Services
            </p>
            <p className="d-flex align-items-center mb-3">
              <i className="isax isax-message-minus text-primary me-2"></i>Comprehensive Planning
            </p>
            <p className="d-flex align-items-center mb-3">
              <i className="isax isax-user-add text-primary me-2"></i>Client Satisfaction
            </p>
            <p className="d-flex align-items-center">
              <i className="isax isax-grammerly text-primary me-2"></i>24/7 Support
            </p>
          </div>
        </div>
      </div>
      {/* Enquire Us */}
      <div className="card shadow-none">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Enquire Us</h5>
          <div className="banner-form">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows={3}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Provider Details */}
      <div className="card shadow-none mb-0">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Provider Details</h5>
          <div className="py-1">
            <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
              <a href="#" className="avatar avatar-lg flex-shrink-0">
                <img src="assets/img/users/user-05.jpg" alt="img" className="rounded-circle" />
              </a>
              <div className="ms-2 overflow-hidden">
                <h6 className="fw-medium text-truncate">
                  <a href="#">Adrian Hendriques</a>
                </h6>
                <p className="fs-14">Member Since : 14 May 2024</p>
              </div>
            </div>
            <div className="border br-10 mb-3 p-3">
              <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                  <i className="isax isax-call-outgoing5"></i>
                </span>
                <p>Call Us : +1 12545 45548</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                  <i className="isax isax-message-search5"></i>
                </span>
                <p>
                  Email :{" "}
                  <a href="mailto:adrian@email.com" className="__cf_email__">
                    adrian@email.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-sm-6">
              <a href="#" className="btn btn-light d-flex align-items-center justify-content-center">
                <i className="isax isax-messages5 me-2"></i>Whatsapp Us
              </a>
            </div>
            <div className="col-sm-6">
              <a href="chat.html" className="btn btn-primary d-flex align-items-center justify-content-center">
                <i className="isax isax-message-notif5 me-2"></i>Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourSidebar;