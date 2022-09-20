import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ProductThumbnail from "../Products/ProductThumbnail";
import "../../styles/components/Products/global.scss";
import { store } from "../../controllers/store/store";
import { useNavigate } from "react-router-dom";

function FavouriteProducts({ isLoggedIn }) {
  const [thumbnails, setThumbnails] = useState([]);
  const navigate = useNavigate();
  store.subscribe(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products.slice(0, 4));
  });

  useEffect(() => {
    const products = store.getState().productsState.products;
    setThumbnails(products.slice(0, 4));
  }, []);

  return (
    <section className="favourites">
      <Typography variant="h3" gutterBottom>
        Favourite Products
      </Typography>
      <section className="product-list">
        {thumbnails.map((thumbnail) => {
          return (
            <ProductThumbnail
              id={thumbnail.id}
              key={thumbnail.id}
              name={thumbnail.name}
              img={thumbnail.image.url}
              pricing={thumbnail.price.formatted_with_symbol}
            />
          );
        })}
      </section>
      <Button
        variant="outlined"
        className="showAll"
        onClick={() => {isLoggedIn ? navigate("/fresh-coffee") : navigate("/my-account") }}
      >
        {isLoggedIn ? "Show all favourites" : "Login to show favourites"}
      </Button>
    </section>
  );
}

export default FavouriteProducts;
