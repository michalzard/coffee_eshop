import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyCartIcon } from "../../assets/empty_cart.svg";
import "../../styles/components/Cart.scss";

function EmptyCart({ setAnchor }) {
  return (
    <section className="cart-empty">
      <EmptyCartIcon className="empty-icon" />
      <Typography variant="h5" gutterBottom>
        No products in cart.
      </Typography>
      <Link to="/fresh-coffee">
        <Typography
          variant="h6"
          onClick={() => {
            setAnchor(null);
          }}
        >
          Continue shopping
        </Typography>
      </Link>
    </section>
  );
}

export default EmptyCart;