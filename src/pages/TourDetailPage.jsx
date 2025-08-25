import React, { useEffect, useState } from "react";
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
import { getTourDetail } from "../services/tourService";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function TourDetail() {
    const { id } = useParams();
    const [tourDetail, setTourDetail] = useState();
    useEffect(() => {
  const fetchTourDetail = async () => {
    try {
      const data = await getTourDetail(id);
      setTourDetail(data);
    } catch (error) {
      console.error("Error fetching tour detail:", error);
    }
  };
  fetchTourDetail();
}, [id]);
  return (
    <>
     <div className="breadcrumb-bar breadcrumb-bg-01 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-12">
                        {/* <h2 className="breadcrumb-title mb-2">Hồ sơ của tôi</h2> */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                        <i className="isax isax-home5"></i>
                                    </a>
                                </li>
                                {/* <li className="breadcrumb-item active" aria-current="page">
                                    Hồ sơ của tôi
                                </li> */}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    
    <div className="container my-4">
      <div className="row">
        {/* Main Content */}
        <div className="col-xl-8">
          <TourSlider tour={tourDetail}/>
          <Description tour={tourDetail}/>
          
          <Itinerary tour={tourDetail}/>
          <IncludesExcludes tour={tourDetail}/>
          <Gallery tour={tourDetail}/>
         <FAQ/>
          <Reviews tour={tourDetail}/>
        </div>
        {/* Sidebar */}
        <TourSidebar tour={tourDetail}/>
      </div>
    </div>
  </>
  );
}
export default TourDetail;