import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    transportation: '',
    startPoint: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="theiaStickySidebar">
      <div className="card filter-sidebar mb-4 mb-lg-0">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5>Filters</h5>
          <a href="#" className="fs-14 link-primary" onClick={() => {
            const reset = {
  title: '',
  type: '',
  transportation: '',
  startPoint: '',
  minPrice: 0,
  maxPrice: 999999
};
            setFilters(reset);
            onFilterChange(reset);
          }}>Reset</a>
        </div>
        <div className="card-body p-0">
          <form>
            

            <div className="accordion accordion-list">
              

              <AccordionItem title="Transportation" id="transport" icon="isax isax-vehicle">
                {["Xe Khách", "Ô Tô", "Thuyền", "Máy Bay", "Tàu Hỏa"].map((transport) => (
                  <Checkbox
                    key={transport}
                    name={transport}
                    label={transport}
                    checked={filters.transportation === transport}
                    onChange={() => handleChange('transportation', filters.transportation === transport ? '' : transport)}
                  />
                ))}
              </AccordionItem>

<AccordionItem title="Điểm khởi hành" id="startPoint" icon="isax isax-location">
  <div className="row">
    {[
      "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Lâm Đồng", "Cà Mau", "Cần Thơ",
      "Khánh Hòa", "Đắk Lắk", "TP. Hồ Chí Minh", "Vĩnh Long", "Sơn La", "Quảng Ninh", "TP. Hải Phòng", "TP. Huế",
      "TP. Đà Nẵng", "Hà Tĩnh", "Cao Bằng", "Lai Châu", "Điện Biên", "Lạng Sơn", "Bắc Giang", "Quảng Bình",
      "Quảng Trị", "Thừa Thiên Huế", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Gia Lai", "Kon Tum", "Ninh Thuận", "Bình Thuận","TP. Hà Nội"
    ].reduce((rows, province, idx, arr) => {
      // Chia thành 2 cột, mỗi cột nửa danh sách
      const half = Math.ceil(arr.length / 2);
      if (idx % half === 0) rows.push([]);
      rows[rows.length - 1].push(province);
      return rows;
    }, []).map((col, colIdx) => (
      <div className="col-6" key={colIdx}>
        {col.map((province) => (
          <Checkbox
            key={province}
            name={province}
            label={province}
            checked={filters.startPoint === province}
            onChange={() =>
              handleChange("startPoint", filters.startPoint === province ? "" : province)
            }
          />
        ))}
      </div>
    ))}
  </div>
</AccordionItem>    

              <AccordionItem title="Price Range" id="price" icon="isax isax-coin">
                <div className="d-flex flex-column">
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Min Price"
                    value={filters.minPrice}
onChange={(e) => handleChange('minPrice', e.target.value === '' ? 0 : e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleChange('maxPrice', e.target.value === '' ? 999999 : e.target.value)}
                  />
                </div>
              </AccordionItem>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ title, id, icon, children }) => (
  <div className="accordion-item border-bottom p-3">
    <div className="accordion-header">
      <div
        className="accordion-button p-0"
        data-bs-toggle="collapse"
        data-bs-target={`#accordion-${id}`}
        aria-expanded="true"
        aria-controls={`accordion-${id}`}
        role="button"
      >
        <i className={`${icon} me-2 text-primary`}></i>
        {title}
      </div>
    </div>
    <div id={`accordion-${id}`} className="accordion-collapse collapse show">
      <div className="accordion-body pt-2">{children}</div>
    </div>
  </div>
);

const Checkbox = ({ name, label, checked, onChange }) => (
  <div className="form-check d-flex align-items-center ps-0 mb-2">
    <input
      className="form-check-input ms-0 mt-0"
      type="checkbox"
      id={name}
      checked={checked}
      onChange={onChange}
    />
    <label className="form-check-label ms-2" htmlFor={name}>
      {label}
    </label>
  </div>
);

export default FilterSidebar;
