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
              minPrice: '',
              maxPrice: ''
            };
            setFilters(reset);
            onFilterChange(reset);
          }}>Reset</a>
        </div>
        <div className="card-body p-0">
          <form>
            <div className="p-3 border-bottom">
              <label className="form-label fs-16">Search by Tour Title</label>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Tour Title"
                  value={filters.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
            </div>

            <div className="accordion accordion-list">
              <AccordionItem title="Tour Type" id="type" icon="isax isax-buildings">
                {["Ecotourism", "Adventure Tour", "Group Tours", "Beach Tours"].map((type) => (
                  <Checkbox
                    key={type}
                    name={type}
                    label={type}
                    checked={filters.type === type}
                    onChange={() => handleChange('type', filters.type === type ? '' : type)}
                  />
                ))}
              </AccordionItem>

              <AccordionItem title="Transportation" id="transport" icon="isax isax-vehicle">
                {["Bus", "Car", "Boat", "Plane"].map((transport) => (
                  <Checkbox
                    key={transport}
                    name={transport}
                    label={transport}
                    checked={filters.transportation === transport}
                    onChange={() => handleChange('transportation', filters.transportation === transport ? '' : transport)}
                  />
                ))}
              </AccordionItem>

              <AccordionItem title="Start Point" id="start" icon="isax isax-location">
                {["Hanoi", "Da Nang", "Ho Chi Minh", "Hue"].map((start) => (
                  <Checkbox
                    key={start}
                    name={start}
                    label={start}
                    checked={filters.startPoint === start}
                    onChange={() => handleChange('startPoint', filters.startPoint === start ? '' : start)}
                  />
                ))}
              </AccordionItem>

              <AccordionItem title="Price Range" id="price" icon="isax isax-coin">
                <div className="d-flex flex-column">
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleChange('minPrice', e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleChange('maxPrice', e.target.value)}
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
