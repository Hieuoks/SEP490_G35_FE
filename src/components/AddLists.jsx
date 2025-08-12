import React from "react";

const lists = [
  {
    count: 4,
    label: "Khách sạn",
    color: "bg-success-100",
    link: "/add-hotel",
    linkText: "Thêm khách sạn mới",
    textClass: "link-default",
  },
  {
    count: 4,
    label: "Chuyến bay",
    color: "bg-pink-100",
    link: "/add-flight",
    linkText: "Thêm chuyến bay mới",
    textClass: "link-primary",
  },
  {
    count: 5,
    label: "Tour",
    color: "bg-danger-100",
    link: "/add-tour",
    linkText: "Thêm tour mới",
    textClass: "link-default",
  },
  {
    count: 9,
    label: "Xe",
    color: "bg-purple-100",
    link: "/add-car",
    linkText: "Thêm xe mới",
    textClass: "link-default",
  },
  {
    count: 8,
    label: "Du thuyền",
    color: "bg-cyan-100",
    link: "/add-cruise",
    linkText: "Thêm du thuyền mới",
    textClass: "link-default",
  },
];

const AddLists = () => (
  <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
    {lists.map((item, idx) => (
      <div className="col" key={item.label + idx}>
        <div className={`card ${item.color} border-0 shadow-none`}>
          <div className="card-body">
            <h6 className="mb-1">{item.count} {item.label}</h6>
            <a
              href={item.link}
              className={`fs-14 fw-medium ${item.textClass} text-decoration-underline`}
            >
              {item.linkText}
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AddLists;