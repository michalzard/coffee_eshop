import {
  Typography,
  Rating,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "../../styles/components/Products/ProductOrder.scss";
import ShareIcon from "@mui/icons-material/Share";
import ProductReviews from "./ProductReviews";


function ProductOrder() {
  const unlockScroll = { disableScrollLock: true };
  const [roastingValue, setRoastingValue] = useState("");
  const [packageSizeValue, setPackageSizeValue] = useState("");
  const [grindingValue, setGrindingValue] = useState("");

  const clearValues = () => {
    setRoastingValue("");
    setPackageSizeValue("");
    setGrindingValue("");
  };
  return (
    <>
      {/* TODO : STYLE THIS WHOLE THING */}
      <section className="productOrder">
        <div className="imgs">
          <img src="broken" className="mainImg" alt="example"></img>
          <div className="additionalImgs">
            <img src="broken" className="altImg" alt="example"></img>
            <img src="broken" className="altImg" alt="example"></img>
            <img src="broken" className="altImg" alt="example"></img>
            <img src="broken" className="altImg" alt="example"></img>
            <img src="broken" className="altImg" alt="example"></img>
          </div>
        </div>
        <div className="info">
          <section className="title">
            <Typography variant="h3">Coffee Name</Typography> <ShareIcon />
          </section>
          <Rating className="rating" readOnly />
          <Typography gutterBottom color="gray">
            Product DescriptionProduct DescriptionProduct DescriptionProduct
            DescriptionProduct DescriptionProduct DescriptionProduct Description
            Product DescriptionProduct DescriptionProduct DescriptionProduct
            DescriptionProduct DescriptionProduct Description
          </Typography>
          <section className="specifications">
            <section className="roasting">
              <Typography gutterBottom>Roasting</Typography>
              <FormControl fullWidth>
                <InputLabel>Select Option</InputLabel>
                <Select
                  label="Select Option"
                  defaultValue={"Filter(Light)"}
                  MenuProps={unlockScroll}
                  value={roastingValue}
                  onChange={(e) => {
                    setRoastingValue(e.target.value);
                  }}
                >
                  <MenuItem value={"Espresso(Dark)"}>Espresso(Dark)</MenuItem>
                  <MenuItem value={"Filter(Light)"}>Filter(Light)</MenuItem>
                </Select>
              </FormControl>
            </section>
            <section className="package-size">
              <Typography gutterBottom>Size of package</Typography>
              <FormControl fullWidth>
                <InputLabel>Select Option</InputLabel>
                <Select
                  label="Select Option"
                  MenuProps={unlockScroll}
                  value={packageSizeValue}
                  onChange={(e) => {
                    setPackageSizeValue(e.target.value);
                  }}
                >
                  <MenuItem value={"1000g"}>1000g</MenuItem>
                  <MenuItem value={"500g"}>500g</MenuItem>
                  <MenuItem value={"200g"}>200g</MenuItem>
                </Select>
              </FormControl>
            </section>
            <section className="grinding">
              <Typography gutterBottom>Grinding</Typography>
              <FormControl fullWidth>
                <InputLabel>Select Option</InputLabel>
                <Select
                  label="Select Option"
                  fullWidth
                  MenuProps={unlockScroll}
                  value={grindingValue}
                  onChange={(e) => {
                    setGrindingValue(e.target.value);
                  }}
                >
                  <MenuItem value={"French Press"}>French Press</MenuItem>
                  <MenuItem value={"Mocca"}>Mocca</MenuItem>
                  <MenuItem value={"Watering"}>Watering</MenuItem>
                  <MenuItem value={"Bean"}>Bean</MenuItem>
                </Select>
              </FormControl>
            </section>
            <Typography className="removeFields" onClick={clearValues} gutterBottom>
              Clear options
            </Typography>
          </section>

          <section className="pricing">
            <Typography className="price" variant="h5" gutterBottom>
              55€ with VAT
            </Typography>
            <div>
              <TextField
                type="number"
                label="Amount"
                className="amount"
                size="small"
                defaultValue={1}
                inputProps={{ maxLength:3,inputMode: "numeric", pattern: "[0-9]*",min:1,max:100}}
                onInput={(e)=>{
                  e.target.value = Math.max(0,parseInt(e.target.value)).toString().slice(0,3);//https://github.com/mui/material-ui/issues/10934
                }}
              >
              </TextField>
              <Button
                className="buyBtn"
                variant="contained"
                color="success"
                size="large"
              >
                Add to cart
              </Button>
            </div>
          </section>
        </div>
      </section>
    <ProductReviews/>
    </>
  );
}

export default ProductOrder;
