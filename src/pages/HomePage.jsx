import React, { useEffect, useState } from "react";
import HomeListTour from "../components/HomeListTour";
import SupportSection from "../components/SupportSection";
import AboutAdvantagesSection from "../components/AboutAdvantagesSection";
import PopularProvidersSection from "../components/PopularProvidersSection";
import HomeExpertsFaqSection from "../components/FaqTourSection";
import { getTour } from "../services/tourService";
import { getTourOp } from "../services/tourOperatorService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const [tour, setTour]= useState([]);
  const [tourOp, setTourOp] = useState([]);
 useEffect(() => {
  const fetchTours = async () => {
    try {
      const data = await getTour(1, 6);
      setTour(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
const fetchTourOp = async () => {
    try {
      const data = await getTourOp(1,6);
      setTourOp(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  fetchTours();
  fetchTourOp();
}, []);
  return (
    <div>
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 col-12">
                        <h2 className="breadcrumb-title mb-2">Khách Hàng</h2>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                              <a href="home">
                                <FontAwesomeIcon icon={faHome} />
                              </a>
                            </li>
                            <li className="breadcrumb-item">Trang Chủ</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
      <HomeListTour tour={tour} />
      <SupportSection />
      <AboutAdvantagesSection />
      <PopularProvidersSection tourOp={tourOp} />
      
    </div>
  );
}