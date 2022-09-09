import React from "react";
import { Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { CartRemove } from "../../controllers/store/reducers/cartReducers";

//setAnchor(null) closes whole Cart Sidebar
function CartProducts({ products }) {
  return (
    <section className="cart-products">
      {products
        ? products.length > 0
          ? products.map((product, i) => {
              return <ProductSummary key={i} product={product} />;
            })
          : null
        : null}
    </section>
  );
}

export default CartProducts;

function ProductSummary({ product }) {
  const dispatch = useDispatch();
  const removeProduct = (id) => {
    console.log(`id from element ${id}`);
    dispatch(CartRemove({id}));
  };

  return (
    <article className="cart-product-summary">
      <div className="_summary">
        <section className="summary-left">
          <img src={product.image.url ? product.image.url : ""} alt="Product" />
        </section>

        <section className="summary-right">
          <Typography variant="h6">{product.product_name}</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Typography>
          <Typography>
            {product.quantity} x {product.price.formatted_with_symbol}
          </Typography>
        </section>
      </div>
      <DeleteForeverIcon
        onClick={() => {
          removeProduct(product.id);
        }}
        className="removeProduct"
      />
    </article>
  );
}
