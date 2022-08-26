import React,{useState} from "react";
import "../../styles/components/Sections/FreshCoffee.scss";
import { MenuItem, Select, Typography } from "@mui/material";
import ProductThumbnail from "../Products/ProductThumbnail";

function FreshCoffee() {
    const [prepValue,setPrepValue] = useState("");
  return (
    <section className="fresh-selection">
      <Typography variant="h2">Fresh Coffee</Typography>
      <Typography className="description">
        We bring you coffee from different corners of the world. We use a
        roaster for roasting beans, which has a tradition since 1987.
        <br /> Thanks to this roaster, first-class green beans and a trained
        roaster, we can provide you with coffee of stable quality and excellent
        taste.
        <br /> We mainly roast 100% Arabica, but you can also find 100% Robusta
        or various blends in our offer.
        <br /> Welcome!
      </Typography>
      <section className="filters">
        <div className="preparation">
          <Typography>Filter by preparation</Typography>
          <Select
            value={prepValue}
            onChange={(e)=>{setPrepValue(e.target.value);}}
            fullWidth
          >
            <MenuItem>Test 1</MenuItem>
            <MenuItem>Test 2</MenuItem>
            <MenuItem>Test 3</MenuItem>
          </Select>
        </div>
        <div className="kind">
          <Typography>Filter by kind</Typography>
          <Select value="Kind - all" fullWidth>
            <MenuItem>Test 1</MenuItem>
            <MenuItem>Test 2</MenuItem>
            <MenuItem>Test 3</MenuItem>
          </Select>
        </div>
      </section>
      <section className="product-list">
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
        <ProductThumbnail />
      </section>
    </section>
  );
}

export default FreshCoffee;
