import React from 'react';

const tourTypes = [
  {
    name: 'Ecotourism',
    count: '216 Hotels',
    image: 'assets/img/tours/tours-01.jpg',
    link: 'tour-grid.html',
  },
  {
    name: 'Adventure Tour',
    count: '569 tours',
    image: 'assets/img/tours/tours-02.jpg',
    link: 'tour-grid.html',
  },
  {
    name: 'Group Tours',
    count: '129 tours',
    image: 'assets/img/tours/tours-03.jpg',
    link: 'tour-grid.html',
  },
  {
    name: 'Beach Tours',
    count: '600 tours',
    image: 'assets/img/tours/tours-04.jpg',
    link: 'tour-grid.html',
  },
  {
    name: 'Historical Tours',
    count: '200 tours',
    image: 'assets/img/tours/tours-05.jpg',
    link: 'tour-grid.html',
  },
  {
    name: 'Summer Trip',
    count: '200 tours',
    image: 'assets/img/tours/tours-06.jpg',
    link: 'tour-grid.html',
  },
];

const TourTypeList = () => {
  return (
    <div className="mb-2">
      <div className="mb-3">
        <h5 className="mb-2">Choose type of Tours you are interested</h5>
      </div>
      <div className="row">
        {tourTypes.map((tour, index) => (
          <div key={index} className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
            <div className="d-flex align-items-center hotel-type-item mb-3">
              <a href={tour.link} className="avatar avatar-lg">
                <img src={tour.image} className="rounded-circle" alt={tour.name} />
              </a>
              <div className="ms-2">
                <h6 className="fs-16 fw-medium">
                  <a href={tour.link}>{tour.name}</a>
                </h6>
                <p className="fs-14">{tour.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourTypeList;
