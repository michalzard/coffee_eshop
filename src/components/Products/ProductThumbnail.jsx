import { Button, Typography,Rating } from "@mui/material";
import React from "react";
import ProductImage from "../../assets/kava1.jpg";
import "../../styles/components/Products/ProductThumbnail.scss";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function ProductThumbnail({name,img,pricing,rating}) {
  return (
<div className="product-thumbnail">
<img src={img ? img : ProductImage} alt="Latest Product" />
<Typography variant="h4" gutterBottom>{name ? name : "Coffee Name"}</Typography>

<Rating defaultValue={rating} readOnly />

<Typography variant="body2"gutterBottom className="pricing">8,70 € - 25,00 € with VAT</Typography>
<Button variant="outlined">Select options</Button>
</div>
  );
}

export default ProductThumbnail;
