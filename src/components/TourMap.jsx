import React from "react";

function Location({tour}) {
  return (
    <div className="bg-light-200 card-bg-light mb-4" id="location">
      <h5 className="fs-18 mb-3">Location</h5>
      {/* Map */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="tour-detail-map w-100"
          title="Tour Location"
        ></iframe>
      </div>
      {/* /Map */}
    </div>
  );
}

export default Location;