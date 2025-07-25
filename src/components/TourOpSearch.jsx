import React, { useState } from 'react';

const BannerForm = ({ searchQuery, setSearchQuery })=> {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tìm kiếm:', searchQuery);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="banner-form">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Bạn muốn tìm nhà điều hành nào?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary rounded">
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerForm;
