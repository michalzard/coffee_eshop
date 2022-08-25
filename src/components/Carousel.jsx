import { Typography } from '@mui/material';
import React from 'react';
import "../styles/components/Carousel.scss";
import {Carousel as ReactCarousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import TestImage from "../assets/kava1.jpg";
import TestImage2 from "../assets/kava2.jpg";

function Carousel() {
  return (
    <ReactCarousel
    autoPlay
    infiniteLoop
    interval={10000}
    centerMode
    showStatus={false}
    renderThumbs={()=>{}}
    >
        <img src={TestImage} alt="First slide"/>
        <img src={TestImage2} alt="Second slide"/>
    </ReactCarousel>
//     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//   <ol className="carousel-indicators">
//     <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//   </ol>
//   <div className="carousel-inner">
//     <div className="carousel-item active">
//       <img className="w-100" src={TestImage} alt="First slide"/>
//     </div>
//     <div className="carousel-item">
//       <img className="w-100" src={TestImage2} alt="Second slide"/>
//     </div>
//     <div className="carousel-item">
//       <img className="w-100" src={TestImage} alt="Third slide"/>
//     </div>
//   </div>
//   <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span className="sr-only">Previous</span>
//   </a>
//   <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//     <span className="sr-only">Next</span>
//   </a>
// </div>
  )
}

export default Carousel;