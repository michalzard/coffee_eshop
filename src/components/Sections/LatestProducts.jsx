import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductThumbnail from "../Products/ProductThumbnail";
import "../../styles/components/Products/global.scss";
import { store } from "../../controllers/store/store";

function LatestProducts() {
  const [thumbnails, setThumbnails] = useState([]);

  store.subscribe(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products.slice(0, 4));
  });

  useEffect(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products.slice(0, 4));
  }, []);

  return (
    <section className="latest">
      <Typography variant="h3">Latest Products</Typography>
      <section className="product-list">
        {thumbnails.map((thumbnail) => {
          return (
            <ProductThumbnail
              key={thumbnail.id}
              name={thumbnail.name}
              img={thumbnail.image.url}
              pricing={thumbnail.price.formatted_with_symbol}
            />
          );
        })}
      </section>
      <Button variant="outlined" className="showAll">
        Show all products
      </Button>
    </section>
  );
}

export default LatestProducts;
