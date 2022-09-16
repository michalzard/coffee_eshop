import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { store } from "../../controllers/store/store";
import "../../styles/components/Sections/CheckoutSection.scss";
import WarningIcon from "@mui/icons-material/Warning";
import {
  captureOrder,
  generateCheckoutId,
  getShippingCountries,
  getShippingOptions,
  getShippingSubdivisions,
} from "../../controllers/eccommerce/checkout";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { refreshCart } from "../../controllers/eccommerce/cart";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutSection({ isLoggedIn }) {
  const [cart, loadCart] = useState({});
  const isObjectEmpty = (obj) => {
    return obj!==undefined && Object.keys(obj).length === 0;
  };
  store.subscribe(() => {
    const cart = store.getState().cart;
    if (cart) loadCart(cart);
  });

  const [checkoutToken, setCheckoutToken] = useState("");
  const [shippingOptions, setShippingOptions] = useState("");
  const [order, setOrder] = useState({});
  useEffect(() => {
    const cart = store.getState().cart;
    if (cart) loadCart(cart);

    const getTokenId = async () => {
      const token = await generateCheckoutId();
      setCheckoutToken(token);
    };
    getTokenId();

    return () => {
      loadCart({});
      setCheckoutToken("");
    };
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await getShippingCountries(checkoutToken);
      const formattedCountries = Object.entries(data).map(([code, label]) => {
        return { code, label };
      });
      setCountries(formattedCountries);
    };
    if (checkoutToken.length > 0) loadCountries();
    return () => {
      setCountries([]);
    };
  }, [checkoutToken]);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, selectCountry] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  // const [countyStateCode,setCountyStateCode] = useState("");
  const [selectedSubdivision, selectSubdivisions] = useState("");

  useEffect(() => {
    const loadSubdivision = async () => {
      const { subdivisions } = await getShippingSubdivisions(
        checkoutToken,
        selectedCountry
      );
      const formatted_subdivisions = Object.entries(subdivisions).map(([code,label])=>{return {code:selectedCountry,label}});
      setSubdivisions(formatted_subdivisions);
      const shippingOptions = await getShippingOptions(checkoutToken, {
        country: selectedCountry,
      });
      const { id } = shippingOptions[0];
      if(id){setShippingOptions(id);}
    };
    
    if(checkoutToken.length > 0 && selectedCountry.length>0){console.log('subdivision loading with',selectedCountry,checkoutToken);loadSubdivision();}
   
  }, [selectedCountry,checkoutToken]);

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  //address stuff
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [town, setTown] = useState("");
  //
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const [personalCollect, setPersonalCollect] = useState(false);
  const [courrier, setCourrier] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleOrder = async (checkoutTokenId, newOrder) => {
    if (terms) {
      try {
        //handle order
        await captureOrder(checkoutTokenId, newOrder).then(data=>{
          console.log(data);
          setOrder(data);
          
        }).catch(err=>console.log(err));
        const newCart = await refreshCart();
        console.log(newCart);
        loadCart(newCart);
      } catch (err) {
        console.log(err);
      }
    } else {
      //throw error
      setTermsError("Please agree to terms and conditions.");
      setTimeout(() => {
        setTermsError("");
      }, 10000);
    }
  };

  return (
    <section className="checkout-container">
      {isLoggedIn ? 
        <>
        {/*!isObjectEmpty(order)*/ true ? <OrderConfirmation order={order}/> :
        <>
          <Typography variant="h3" gutterBottom>
            Checkout
          </Typography>
          <div className="checkout">
            <article className="billing-info">
              <Typography variant="h5" gutterBottom>
                Billing Information
              </Typography>
              <section className="name">
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </section>

              <AddressForm
                regions={subdivisions}
                countries={countries}
                selectedCountry={selectedCountry}
                selectCountry={selectCountry}
                selectedRegion={selectedSubdivision}
                setRegion={selectSubdivisions}
                // setCountyStateCode={setCountyStateCode}
                street={street}
                setStreet={setStreet}
                zipcode={zipcode}
                setZipcode={setZipcode}
                town={town}
                setTown={setTown}
              />

              <TextField
                label="Phone Number"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Leave any notes regarding the order"
                multiline
                rows={2}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </article>

            <article className="order-info">
              <Typography variant="h5" gutterBottom>
                Your order
              </Typography>

              <section className="prod-desc">
                <Typography gutterBottom>Product</Typography>
                <Typography gutterBottom>Subtotal</Typography>
              </section>
              <section className="cart-items">
                {!isObjectEmpty(cart) && cart.line_items.length > 0
                  ? cart.line_items.map((item, i) => {
                      return <CheckoutProductSummary key={i} product={item} />;
                    })
                  : null}
              </section>

              <hr />
              <Typography gutterBottom style={{ alignSelf: "flex-end" }}>
                Subtotal{" "}
                {!isObjectEmpty(cart) && cart.line_items.length > 0
                  ? cart.subtotal.formatted_with_symbol
                  : ""}
              </Typography>
              <Typography variant="h6">Delivery</Typography>
              <section className="checkout-delivery">
                <Typography>
                  Personal Collection{" "}
                  <Checkbox
                    onClick={() => {
                      setPersonalCollect(!personalCollect);
                      setCourrier(false);
                    }}
                    checked={personalCollect}
                  />{" "}
                </Typography>
                <Typography>
                  Courrier Name{" "}
                  <Checkbox
                    onClick={() => {
                      setCourrier(!courrier);
                      setPersonalCollect(false);
                    }}
                    checked={courrier}
                  />{" "}
                </Typography>
              </section>
              <Typography>
                I have read and agree to the general terms and conditions.
                <Checkbox
                  onClick={() => {
                    setTerms(!terms);
                  }}
                  checked={terms}
                />{" "}
              </Typography>
              <Typography
                variant="caption"
                color="red"
                className="termsError"
                gutterBottom
              >
                {termsError.length > 0 ? <WarningIcon /> : null} {termsError}
              </Typography>
              {/* STRIPE */}
              <PaymentForm
                firstName={firstName}
                checkoutTokenId={checkoutToken}
                surname={surname}
                email={email}
                items={cart.items}
                street={street}
                city={town}
                subdivision={selectedSubdivision}
                // countyStateCode={countyStateCode}
                zipcode={zipcode}
                country={selectedCountry}
                shippingID={shippingOptions}
                handleOrder={handleOrder}
              />
            </article>
          </div>
          </>
        }
        </>
       : 
        <Typography>Checkout isn't available without login </Typography>
      }
    </section>
  );
}

export default CheckoutSection;
//SET PHONE NUMBER FIELD TO ACCEPT 10NUMBERICAL NUMBERS ONLY
function AddressForm({
  countries,
  regions,
  selectCountry,
  selectedCountry,
  selectedRegion,
  setRegion,
  setCountyStateCode,
  street,
  setStreet,
  zipcode,
  setZipcode,
  town,
  setTown,
}) {
  const formStyle = { marginTop: "20px" };
  return (
    <form className="address-form">
      {/* THIS NEEDS TO BE SELECT */}
      <FormControl fullWidth style={formStyle}>
        <InputLabel id="country-select">Country</InputLabel>
        <Select
          labelId="country-select"
          id="country-select"
          label="Country/Region"
          value={selectedCountry}
          onChange={(e) => {selectCountry(e.target.value);console.log('selected country',e.target.value);}}
        >
          {countries.length > 0 ? (
            countries.map((country) => {
              return (
                <MenuItem key={country.code} value={country.code}>
                  {country.label} 
                </MenuItem>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth style={formStyle}>
        <InputLabel id="subdivision-select">Region</InputLabel>
        <Select
          labelId="subdivision-select"
          id="subdivision-select"
          label="Region"
          value={selectedRegion}
          onChange={(e) => {setRegion(e.target.value);}}
        >
          {regions.length > 0 ? (
            regions.map((region,i) => {
              return (
                <MenuItem key={i} value={region.code}>
                  {region.label} 
                </MenuItem>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Select>
      </FormControl>

      <TextField
        label="Street name and house number"
        fullWidth
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <TextField
        label="Zipcode"
        fullWidth
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
      />

      <TextField
        label="Town"
        fullWidth
        value={town}
        onChange={(e) => setTown(e.target.value)}
      />
    </form>
  );
}

function CheckoutProductSummary({ product }) {
  return (
    <div className="checkout-product-summary">
      <Typography variant="subtitle1">
        {product.name || "Coffee"} x {product.quantity}
      </Typography>
      <Typography variant="subtitle1">
        {product.price.formatted_with_symbol || ""}
      </Typography>
    </div>
  );
}

function PaymentForm(props){
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault(); //website will not refresh
    if (!stripe || !elements) return;
    const cardEl = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardEl,
    });
    if (error) {
      console.log(error);
    } 
    else {
      const orderData = {
        line_items: props.items,
        customer: {
          firstName: props.firstName,
          lastname: props.surname,
          email: props.email,
        },
        shipping: {
          name: "Primary",
          street: props.street,
          town_city: props.city,
          // county_state: props.countyStateCode,
          postal_zip_code: props.zipcode,
          country: props.country,
        },
        fulfillment: { shipping_method: props.shippingID },
        // Include Stripe payment method ID:
        payment: {
          gateway:'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      props.handleOrder(props.checkoutTokenId, orderData);
      return;
    }
  };

  return (
    <Elements stripe={StripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form
            onSubmit={(e) => {
              handleSubmit(e, elements, stripe);
            }}
          >
            <CardElement options={{ hidePostalCode: true }} />
            <div>
              <Button variant="contained" type="submit" disabled={!stripe}>
                Pay {props.subtotal}
              </Button>
            </div>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
  );
};

function OrderConfirmation({order}){
  return(
    <article className="order-confirmation">
    <Typography>Order Confirmed!</Typography>
    <Typography>Order number {order.customer_reference}</Typography>
    <Typography>Ordered Items</Typography>
    {
      order.order.line_items.map((item,i)=>(
      <section className="order-item" key={i}>
        {/* {console.log(item)} */}
      <img src={item.image.url} alt={item.image.filename} style={{width:"50px",height:"50px"}}/>
      <Typography>{item.price.formatted_with_symbol} x {item.quantity}</Typography>
      </section> 
      ))
    }
    <Typography>Order Total {order.order_value.formatted_with_symbol}</Typography>
    
    <footer className="confirmation-footer">
    <section>
    <AlternateEmailIcon/>
    <Typography>Any Questions?</Typography>
    <Typography>if you need any help,emails us anytime <u>{order.merchant.support_email}</u></Typography>
    </section>
    <Typography>Following us?</Typography>
    <section>
      social icons
    </section>
    </footer>
    </article>
  )
}
