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
import React, { useEffect, useState } from "react";
import "../../styles/components/Products/ProductOrder.scss";
import ShareIcon from "@mui/icons-material/Share";
import ProductReviews from "./ProductReviews";
import { store } from "../../controllers/store/store";
import { selectProduct } from "../../controllers/store/productSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartAdd } from "../../controllers/store/reducers/cartReducers";

function ProductOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const unlockScroll = { disableScrollLock: true };
  const [roastingValue, setRoastingValue] = useState("");
  const [packageSizeValue, setPackageSizeValue] = useState("");
  const [grindingValue, setGrindingValue] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const clearValues = () => {
    setRoastingValue("");
    setPackageSizeValue("");
    setGrindingValue("");
  };

  useEffect(() => {
    const { products, selectedId } = store.getState().productsState;
    if (!selectedId) {
      dispatch(selectProduct(id));
      //store subscription than handles product array on emmited event
    } else {
      const productById = products.find((product) => product.id === selectedId);
      setCurrentProduct(productById);
    }
  }, [dispatch,id]);

  store.subscribe(() => {
    const { products, selectedId, loading } = store.getState().productsState;
    setLoading(loading);
    if (products.length > 0 && selectedId) {
      const productById = products.find((product) => product.id === selectedId);
      setCurrentProduct(productById);
    }
  });

  const addProductToCart=()=>{
    dispatch(CartAdd({productId:id,quantity:numberOfItems}));
  }

  return (
    <>
      <section className="productOrder">
        <div className="imgs">
          <img
            src={currentProduct ? currentProduct.image.url : null}
            className="mainImg"
            alt="Product"
          ></img>
          <div className="additionalImgs">
            {currentProduct
              ? currentProduct.assets.map((asset,i) => {
                  return (
                    <img
                      key={i}
                      src={asset.url}
                      className="altImg"
                      alt={asset.permalink}
                    ></img>
                  );
                })
              : null}
          </div>
        </div>
        <div className="info">
          <section className="title">
            <Typography variant="h3">
              {currentProduct ? currentProduct.name : "Coffee Name"}
            </Typography>{" "}
            <ShareIcon />
          </section>
          <Rating className="rating" readOnly />
          <Typography gutterBottom color="gray">
          {currentProduct  ? currentProduct.description.length>0 ? currentProduct.description : "This product has no description." : null}

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
            <Typography
              className="removeFields"
              onClick={clearValues}
              gutterBottom
            >
              Clear options
            </Typography>
          </section>

          <section className="pricing">
            <Typography className="price" variant="h5" gutterBottom>
              {isLoading ? (
                "Loading ..."
              ) : (
                <>
                  {currentProduct
                    ? currentProduct.price.raw * numberOfItems
                    : "7.77"}
                  € with VAT
                </>
              )}
            </Typography>
            <div>
              <TextField
                type="number"
                label="Amount"
                className="amount"
                size="small"
                defaultValue={1}
                inputProps={{
                  maxLength: 3,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                  max: 100,
                }}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3); //https://github.com/mui/material-ui/issues/10934
                }}
                onChange={(e) => {
                  setNumberOfItems(e.target.value);
                }}
              ></TextField>
              <Button
                className="buyBtn"
                variant="contained"
                color="success"
                size="large"
                disabled={isLoading}
                onClick={addProductToCart}
              >
                Add to cart
              </Button>
            </div>
          </section>
        </div>
      </section>
      <ProductReviews />
    </>
  );
}

export default ProductOrder;
