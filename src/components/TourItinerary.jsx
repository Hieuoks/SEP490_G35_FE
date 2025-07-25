import React from "react";

const itinerary = [
  {
    step: "01",
    title: "Day 1, Kickoff in Los Angeles",
    date: "25 May 2025, 04:45 AM",
    img: "assets/img/tours/tours-16.jpg",
    desc:
      "The tour launches with a spectacular concert at The Hollywood Bowl, where Luna will debut her latest hits amidst a breathtaking backdrop of lights and visuals.",
  },
  {
    step: "02",
    title: "Day 2, West Coast Wonders",
    date: "26 May 2025, 09:45 AM",
    img: "assets/img/tours/tours-17.jpg",
    desc:
      "Fans in Seattle and Portland can look forward to intimate performances, complete with fan meet-and-greets that allow for personal connections with Luna.",
  },
  {
    step: "03",
    title: "Day 3, Midwest Magic",
    date: "27 May 2025, 09:45 AM",
    img: "assets/img/tours/tours-18.jpg",
    desc:
      "The tour moves to Chicago, where Luna will perform at the iconic United Center. Expect a night filled with energy and emotion as she shares her music with devoted fans.",
  },
  {
    step: "04",
    title: "Day 4, East Coast Excitement",
    date: "31 May 2025, 09:45 AM",
    img: "assets/img/tours/tours-19.jpg",
    desc:
      "The New York show at Madison Square Garden promises to be a highlight of the tour, featuring special guests and surprises. Luna will also engage with fans in Central Park, offering a chance for unforgettable memories.",
  },
];

function Itinerary() {
  return (
    <div className="bg-light-200 card-bg-light mb-4">
      <h5 className="fs-18 mb-3">Itinerary</h5>
      <div className="card shadow-none mb-0">
        <div className="card-body p-3">
          <div className="stage-flow">
            {itinerary.map((item, idx) => (
              <div className="d-flex align-items-center flows-step" key={idx}>
                <span className="flow-step">{item.step}</span>
                <div className="flow-content">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      <h6 className="fw-medium mb-1">{item.title}</h6>
                      <p>{item.date}</p>
                    </div>
                    <span className="avatar avatar-lg avatar-rounded flex-shrink-0">
                      <img src={item.img} alt="Img" />
                    </span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;