import React, { useState } from 'react';

const SearchForm = () => {
  const [location, setLocation] = useState('Newyork');
  const [startDate, setStartDate] = useState('21-10-2025');
  const [endDate, setEndDate] = useState('21-10-2025');
  const [travelers, setTravelers] = useState({ rooms: 1, adults: 1, children: 1, infants: 1 });

  const handleQuantityChange = (field, delta) => {
    setTravelers((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, startDate, endDate, travelers });
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="d-lg-flex" onSubmit={handleSubmit}>
          <div className="d-flex form-info flex-wrap">
            <div className="form-item dropdown me-3 mb-3">
              <label className="form-label fs-14 text-default mb-1">Where would like to go?</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="fs-12 mb-0">USA</p>
            </div>

            <div className="form-item me-3 mb-3">
              <label className="form-label fs-14 text-default mb-1">Dates</label>
              <input
                type="text"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <p className="fs-12 mb-0">Monday</p>
            </div>

            <div className="form-item me-3 mb-3">
              <label className="form-label fs-14 text-default mb-1">Check Out</label>
              <input
                type="text"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <p className="fs-12 mb-0">Monday</p>
            </div>

            <div className="form-item me-3 mb-3">
              <label className="form-label fs-14 text-default mb-1">Travellers</label>
              <div>
                <h5>{travelers.adults + travelers.children + travelers.infants} <span className="fw-normal fs-14">Persons</span></h5>
                <p className="fs-12 mb-0">{travelers.adults} Adult</p>
              </div>
              {/* You can replace this with a modal/dropdown */}
            </div>
          </div>
          <button type="submit" className="btn btn-primary search-btn rounded">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
