import React from "react";
import "../styles/components/Carousel.scss";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import TestImage from "../assets/kava1.jpg";
import TestImage2 from "../assets/kava2.jpg";

function Carousel() {
  return (
    <ReactCarousel
      autoPlay
      infiniteLoop
      interval={5000}
      centerMode
      showStatus={false}
      renderThumbs={() => {}}
      renderArrowPrev={() => {}}
      renderArrowNext={() => {}}
    >
      <img src={TestImage} alt="First slide" />
      <img src={TestImage2} alt="Second slide" />
    </ReactCarousel>
  );
}

export default Carousel;
