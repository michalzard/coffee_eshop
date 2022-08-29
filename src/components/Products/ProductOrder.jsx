import { Typography,Rating } from "@mui/material";
import React from "react";

function ProductOrder() {
  return (
    <section className="productOrder">
      <div className="imgs">
        <img src="broken" className="mainImg"></img>
        <div className="additionalImgs">
          <img src="broken" className="altImg"></img>
          <img src="broken" className="altImg"></img>
          <img src="broken" className="altImg"></img>
          <img src="broken" className="altImg"></img>
          <img src="broken" className="altImg"></img>
        </div>
      </div>
    <div className="info">
    <Typography variant="h4">Coffee Name</Typography>
    <Rating readOnly/>
    <Typography>Product Description</Typography>
    <Typography>Pricing ~ Pricing </Typography>
    <Typography>Here go custom fields like :</Typography>
    <Typography>Roasting</Typography>
    <Typography>Size of package</Typography>
    <Typography>Grinding</Typography>
    <Typography>Number of items</Typography>
    <Typography>Add to cart</Typography>
    </div>
    <div className="recommendations">
    <Typography>Thumbnail</Typography>
    <Typography>Thumbnail</Typography>
    
    <Typography>Thumbnail</Typography>
    </div>
    <div className="reviews">
    <Typography>OverallScore</Typography>
    <Rating readOnly/>
    <Typography>Rating list where it displays specific stars(num)</Typography>
    <Typography>List of user submitted reviews</Typography>
    <Typography>For example : name,location,reviewed at specific date,name of products
    star rating , pros & cons
    </Typography>
    </div>
    </section>
  );
}

export default ProductOrder;
