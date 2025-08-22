import React, { useEffect, useState, useRef } from "react";
import HomeListTour from "../components/HomeListTour";
import SupportSection from "../components/SupportSection";
import AboutAdvantagesSection from "../components/AboutAdvantagesSection";
import PopularProvidersSection from "../components/PopularProvidersSection";
import HomeExpertsFaqSection from "../components/FaqTourSection";
import { getTour } from "../services/tourService";
import { getTourOp } from "../services/tourOperatorService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HeroSection from "../components/HeroSection";
import Section from "../components/HeroSection2";
import DestinationSection from "../components/Category";
import BenefitSection from "../components/BenefitSection";
import TestimonialSection from "../components/TestimonialSection";
import { getAllFeedBack } from "../services/feedbackService"; // Giả định có service lấy feedback
export default function HomePage() {
  const [tour, setTour] = useState([]);
  const [tourOp, setTourOp] = useState([]);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTour(1, 6);
        setTour(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedBack();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    const fetchTourOp = async () => {
      try {
        const data = await getTourOp(1, 6);
        setTourOp(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
    fetchTourOp();
    fetchFeedback();
  }, []);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <div>

      <HeroSection />
      <DestinationSection />
      <BenefitSection />
      <HomeListTour tour={tour} />
      <SupportSection />
      <AboutAdvantagesSection />


      <PopularProvidersSection tourOp={tourOp} />
      <div className="video-wrap" style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, position: "relative", left: "50%", right: "50%", transform: "translate(-50%, 0)", background: "#000" }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Au6LqK1UH8g"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            borderRadius: 0,
            background: "#000",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
      <TestimonialSection feedback={feedback} />
    </div>
  );
}