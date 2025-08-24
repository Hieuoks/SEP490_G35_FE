import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
const Breadcrumb = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [type, setType] = useState("tour");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "tour") {
      if (search.trim()) {

        navigate(`/tour-list?title=${encodeURIComponent(search.trim())}`);
      }
    } else {
      if (search.trim()) {
        navigate(`/tour-operator?title=${encodeURIComponent(search.trim())}`);
      }
    }
  };
  return (
    // Breadcrumb
    <div className="breadcrumb-bar breadcrumb-bg-04 text-center">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-7 col-7 ">
            <nav aria-label="breadcrumb">

              <div className="banner-form card mb-0">

                <div className="card-body">
                  <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Nhập tên..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ maxWidth: 400 }}
                    />
                    <div className="dropdown me-3">
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e) => {
                        setType(e.target.value);
                      }}>
                        <option value="tour" defaultValue>Tour</option>
                        <option value="operator">Nhà Điều hành</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
  // /Breadcrumb
};

export default Breadcrumb;