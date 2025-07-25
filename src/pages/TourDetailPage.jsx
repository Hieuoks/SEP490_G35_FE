import React from "react";
import TourSlider from "../components/TourDetailSlider";
import Description from "../components/TourDetailDescription";
import Highlights from "../components/TourHighlights";
import Itinerary from "../components/TourItinerary";
import IncludesExcludes from "../components/TourIncludesExcludes";
import Gallery from "../components/TourGallery";
import Location from "../components/TourMap";
import FAQ from "../components/TourFAQ";
import Reviews from "../components/TourRating";
import TourSidebar from "../components/TourDetailSideBar";

function TourDetail() {
  return (
    <div className="container my-4">
      <div className="row">
        {/* Main Content */}
        <div className="col-xl-8">
          <TourSlider />
          <Description />
          <Highlights />
          <Itinerary />
          <IncludesExcludes />
          <Gallery />
          <Location />
          <FAQ />
          <Reviews />
        </div>
        {/* Sidebar */}
        <TourSidebar />
      </div>
    </div>
  );
}
export default TourDetail;