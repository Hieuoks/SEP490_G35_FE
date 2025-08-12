import React from "react";
import { FaUserEdit, FaClipboardList, FaUserTie, FaMapMarkedAlt, FaHeadset, FaLeaf, FaGlobeAsia } from "react-icons/fa";

const supportItems = [
  {
    icon: <FaUserEdit />,
    text: "Lịch trình cá nhân hóa",
  },
  {
    icon: <FaClipboardList />,
    text: "Lập kế hoạch toàn diện",
  },
  {
    icon: <FaUserTie />,
    text: "Hướng dẫn chuyên nghiệp",
  },
  {
    icon: <FaMapMarkedAlt />,
    text: "Trải nghiệm địa phương",
  },
  {
    icon: <FaHeadset />,
    text: "Hỗ trợ khách hàng",
  },
  {
    icon: <FaLeaf />,
    text: "Nỗ lực vì sự bền vững",
  },
  {
    icon: <FaGlobeAsia />,
    text: "Nhiều khu vực",
  },
];

export default function SupportSection() {
  return (
    <section className="support-section section-skew support-sec-two bg-primary">
      <div className="horizontal-slide d-flex" data-direction="left" data-speed="slow">
        <div className="slide-list d-flex">
          {supportItems.map((item, idx) => (
            <div className="support-item d-flex align-items-center" key={idx}>
              <span className="me-2 text-white fs-5">{item.icon}</span>
              <h5 className="mb-0 text-white">{item.text}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}