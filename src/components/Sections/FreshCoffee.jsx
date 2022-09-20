import React, { useEffect, useState } from "react";
import "../../styles/components/Sections/FreshCoffee.scss";
import {
  MenuItem,
  Select,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import ProductThumbnail from "../Products/ProductThumbnail";
import { store } from "../../controllers/store/store";

function FreshCoffee({isLoggedIn}) {
  const [prepValue, setPrepValue] = useState("");
  const [thumbnails, setThumbnails] = useState([]);

  store.subscribe(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products);
  });

  useEffect(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products);
  }, []);

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
          <FormControl className="filterForm" fullWidth>
            <InputLabel id="filter-label">Preparation</InputLabel>
            <Select
              labelId="filter-label"
              value={prepValue}
              onChange={(e)=>setPrepValue(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="kind">
          <Typography>Filter by kind</Typography>
          <FormControl className="filterForm" fullWidth>
            <InputLabel id="demo-simple-select-labe2l">Kind</InputLabel>
            <Select
              labelId="demo-simple-select-labe2l"
              id="demo-simple-select"
              value={prepValue}
              onChange={(e)=>setPrepValue(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </section>
      <section className="product-list">
       {thumbnails.map((thumbnail) => {
          return (
            <ProductThumbnail
              key={thumbnail.id}
              id={thumbnail.id}
              name={thumbnail.name}
              img={thumbnail.image.url}
              pricing={thumbnail.price.formatted_with_symbol}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </section>
    </section>
  );
}

export default FreshCoffee;
