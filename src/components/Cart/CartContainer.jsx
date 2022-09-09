import React from "react";
import { Close } from "@mui/icons-material";
import { Button, SwipeableDrawer, Typography } from "@mui/material";
import CartProducts from "./CartProducts";
import EmptyCart from "./Empty";
import "../../styles/components/Cart.scss";
import { useNavigate } from "react-router-dom";

function CartContainer({ anchor, setCartAnchor, cartObject }) {
  const navigate=useNavigate();
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={Boolean(anchor)}
      onClose={() => setCartAnchor(null)}
      onOpen={() => setCartAnchor(anchor)}
    >
      <section className="cart-container">
        <Close
          className="closeIcon"
          onClick={() => {
            setCartAnchor(null);
          }}
        />
        {cartObject ? 
        cartObject.items.length > 0 ? <>
        <CartProducts products={cartObject.items} />
        <section className="subtotal">
        <Typography variant="h6" gutterBottom>Subtotal {cartObject.subtotal.formatted_with_symbol}</Typography>
        </section>
        <Button variant="contained" className="checkoutBtn" onClick={()=>{navigate("/checkout");setCartAnchor(null);}}>Checkout</Button>
        </>
        : <EmptyCart setAnchor={setCartAnchor} />
        : null}
      </section>
    </SwipeableDrawer>
  );
}

export default CartContainer;
