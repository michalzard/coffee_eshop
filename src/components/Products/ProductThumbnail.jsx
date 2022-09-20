import { Button, Typography, Rating } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductImage from "../../assets/kava1.jpg";
import { selectProduct } from "../../controllers/store/productSlice";
import "../../styles/components/Products/ProductThumbnail.scss";

function ProductThumbnail({ id, name, img, pricing, rating, }) {
  const dispatch = useDispatch();
  const selectProductById=()=>{
    dispatch(selectProduct(id));
  }
  return (
    <div className="product-thumbnail">
      <Link replace to={`/product/${id}`} onClick={()=>{selectProductById(id);}}>
        <img src={img ? img : ProductImage} alt="Latest Product" />
      </Link>
      <Typography variant="h5" gutterBottom>
        {name ? name : "Coffee Name"}
      </Typography>

      <Rating defaultValue={rating} readOnly />

      <Typography variant="body2" gutterBottom className="pricing">
        {pricing || "0"} with VAT
      </Typography>
      <Link replace to={`/product/${id}`} onClick={()=>{selectProductById(id);}}>
        <Button variant="outlined">Select options</Button>
      </Link>
    </div>
  );
}

export default ProductThumbnail;
