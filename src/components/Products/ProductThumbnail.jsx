import { Button, Typography, Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../../assets/kava1.jpg";
import "../../styles/components/Products/ProductThumbnail.scss";

function ProductThumbnail({ name, img, pricing, rating }) {
  return (
    <div className="product-thumbnail">
      <Link to="/product/:id">
        <img src={img ? img : ProductImage} alt="Latest Product" />
      </Link>
      <Typography variant="h5" gutterBottom>
        {name ? name : "Coffee Name"}
      </Typography>

      <Rating defaultValue={rating} readOnly />

      <Typography variant="body2" gutterBottom className="pricing">
        8,70 € - 25,00 € with VAT
      </Typography>
      <Link to="/product/:id">
        <Button variant="outlined">Select options</Button>
      </Link>
    </div>
  );
}

export default ProductThumbnail;
