import React, { useEffect, useState } from "react";
import "../styles/components/Carousel.scss";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchAllProducts } from "../controllers/eccommerce/products";
import { CircularProgress } from "@mui/material";


function Carousel() {
  const [showcaseProducts,setShowcaseProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await fetchAllProducts(3);
      setShowcaseProducts(products);
    }
    getProducts();
  }, []);

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
      {
      showcaseProducts.length > 0 ? showcaseProducts.map((prod) => {
        return <img className="carousel-showcase-photo" key={prod.id} src={`${prod.image.url}`} />;
      })
      : <CircularProgress />
      }
    </ReactCarousel>
  );
}

export default Carousel;
