import React, { useEffect, useState } from "react";
import "../styles/components/Carousel.scss";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress } from "@mui/material";
import { store } from "../controllers/store/store";

function Carousel() {
  const [showcaseProducts, setShowcaseProducts] = useState([]);

  store.subscribe(() => {
    const { products } = store.getState().productsState;
    setShowcaseProducts(products.slice(0,4));
  });

  useEffect(() => {
    const { products } = store.getState().productsState;
    setShowcaseProducts(products.slice(0,4));
    //cleanup
    return () => setShowcaseProducts([]);
  }, []);

  return (
    <>
    {
    showcaseProducts.length > 0 ? 
    <ReactCarousel
    autoPlay
    infiniteLoop
    centerMode
    showStatus={false}
    renderThumbs={() => {}}
    renderArrowPrev={() => {}}
    renderArrowNext={() => {}}
    >
    {showcaseProducts.map((prod) => {
    return <img className="carousel-showcase-photo" key={prod.id} src={`${prod.image.url}`} alt={`${prod.seo.title}`}/>
    })
    } 
    </ReactCarousel>
      : 
      <section className="carousel-loading">
      <CircularProgress/>
      </section>
    }
    </>
  );
}

export default Carousel;
