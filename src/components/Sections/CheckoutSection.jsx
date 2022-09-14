import { Button, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { store } from '../../controllers/store/store';
import "../../styles/components/Sections/CheckoutSection.scss";
import WarningIcon from '@mui/icons-material/Warning';
import { generateCheckoutId, getShippingCountries, getShippingSubdivisions } from '../../controllers/eccommerce/checkout';
// import {Elements,CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
// import {loadStripe} from "@stripe/stripe-js";

// const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


function CheckoutSection({isLoggedIn}) {
  const [cart,loadCart] = useState({});
  const isObjectEmpty = (obj)=>{return obj && Object.keys(obj).length === 0;}
  store.subscribe(()=>{
    const cart = store.getState().cart;
    if(cart) loadCart(cart);
  });

  const [checkoutToken,setCheckoutToken] = useState("");

  useEffect(()=>{
    const cart = store.getState().cart;
    if(cart) loadCart(cart);
    
    const getTokenId = async () => {
      const token = await generateCheckoutId();
      setCheckoutToken(token);
    }
    getTokenId();

    return () => {loadCart({});setCheckoutToken("");}
  },[]);


  useEffect(()=>{
    const loadCountries=async()=>{
    const data =  await getShippingCountries(checkoutToken);
    const formattedCountries = Object.entries(data).map(([code,label])=>{return {code,label}});
    setCountries(formattedCountries);
    }
    if(checkoutToken.length > 0) loadCountries();
    return ()=>{setCountries([]);}
  },[checkoutToken]);

  
  const [countries,setCountries] = useState([]);
  const [selectedCountry,selectCountry] = useState("");
  const [regions,setRegions] = useState([]);
  const [selectedRegion,setRegion] = useState("");

  useEffect(()=>{
  const loadSubdivision=async()=>{
  const {subdivisions} = await getShippingSubdivisions(checkoutToken,selectedCountry);
  const formattedSubdivisions = Object.entries(subdivisions).map(([code,label])=>{return {code,label}});
  setRegions(formattedSubdivisions);
  }
  if(selectedCountry.length>0) loadSubdivision();
  return ()=>{setRegions([]);}
  },[selectedCountry,checkoutToken]);

 
  
  //address stuff
  const [surname,setSurname] = useState("");
  const [firstName,setFirstName] = useState("");
  const [street,setStreet] = useState("");
  const [zipcode,setZipcode] = useState("");
  const [town,setTown] = useState("");
  //
  const [phoneNumber,setPhoneNumber] = useState("");
  const [email,setEmail] = useState("");
  const [orderNote,setOrderNote] = useState("");
  
  const [personalCollect,setPersonalCollect] = useState(false);
  const [courrier,setCourrier] = useState(false);
  const [terms,setTerms] = useState(false);
  const [termsError,setTermsError] = useState("");

  const handleOrder=()=>{
    if(terms){
      //handle order
    }else{
      //throw popup
      setTermsError("Please agree to terms and conditions.");
      setTimeout(()=>{setTermsError("")},10000);
    }
  }

  return (
      <section className='checkout-container'>
      {
      isLoggedIn ? 
      <>
      <Typography variant='h3' gutterBottom>Checkout</Typography>
      <div className="checkout">
      <article className="billing-info">
      <Typography variant="h5" gutterBottom>Billing Information</Typography>
      <section className="name">
      <TextField label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
      <TextField label="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
      </section>

      <AddressForm regions={regions} countries={countries} selectedCountry={selectedCountry} selectCountry={selectCountry} selectedRegion={selectedRegion} setRegion={setRegion}  street={street} setStreet={setStreet} zipcode={zipcode} setZipcode={setZipcode} town={town} setTown={setTown}/>
      
      <Typography gutterBottom>Phone Number</Typography>
      <TextField label="Phone Number" type="tel" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
      <Typography gutterBottom>Email</Typography>
      <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Typography gutterBottom>Order note</Typography>
      <TextField label="Leave any notes regarding the order" multiline rows={2} value={orderNote} onChange={(e)=>setOrderNote(e.target.value)}/>
      </article>
      
      <article className="order-info">
      <Typography variant="h5" gutterBottom>Your order</Typography>
    
      <section className="prod-desc">
      <Typography gutterBottom>Product</Typography>
      <Typography gutterBottom>Subtotal</Typography>
      </section>
      <section className="cart-items">
      {
        !isObjectEmpty(cart)  ? cart.items.map((item,i)=>{return <CheckoutProductSummary key={i} product={item}/>}) : null
      }
      </section>

      <hr/>
      <Typography gutterBottom style={{alignSelf:"flex-end"}}>Subtotal { !isObjectEmpty(cart) ? cart.subtotal.formatted_with_symbol : ""}</Typography>
      <Typography variant="h6">Delivery</Typography>
      <section className="checkout-delivery">
      <Typography>Personal Collection <Checkbox onClick={()=>{setPersonalCollect(!personalCollect);setCourrier(false);}} checked={personalCollect}/> </Typography>
      <Typography>Courrier Name <Checkbox onClick={()=>{setCourrier(!courrier);setPersonalCollect(false);}} checked={courrier}/> </Typography>
      </section>
      {/* STRIPE */}
      {/* <Elements stripe={StripePromise}>
          <StripeCheckoutForm/>          
      </Elements> */}
      {/*  */}
      <Typography>I have read and agree to the general terms and conditions. 
      <Checkbox onClick={()=>{setTerms(!terms)}} checked={terms}/> </Typography>
      <Typography variant="caption" color="red" className='termsError'>{termsError.length > 0 ? <WarningIcon/> : null } {termsError}</Typography>
      <Button variant="contained" type="submit" onSubmit={handleOrder}>Order with payment obligation</Button>
      </article>
      </div>
      </>
      : <Typography>Checkout isn't available without login</Typography>
    }
    </section>
  )
}

export default CheckoutSection;

function AddressForm({countries,regions,selectCountry,selectedCountry,selectedRegion,setRegion,street,setStreet,zipcode,setZipcode,town,setTown}) {
  const formStyle={marginTop:"20px"}
  return (
    <form className="address-form">
      {/* THIS NEEDS TO BE SELECT */}
      <FormControl fullWidth style={formStyle}>
      <InputLabel id="country-select">Country</InputLabel>
      <Select labelId='country-select' id="country-select" label="Country/Region" value={selectedCountry} onChange={(e)=>selectCountry(e.target.value)}>
      { 
        countries.length > 0  ? countries.map(country=>{return <MenuItem key={country.code} value={country.code}>{country.label}</MenuItem>})
        : <CircularProgress/>
      }
      </Select></FormControl>

      <FormControl fullWidth style={formStyle}>
      <InputLabel id="subdivision-select">Subdivision</InputLabel>
      <Select labelId='subdivision-select' id="subdivision-select" label="Region" value={selectedRegion} onChange={(e)=>setRegion(e.target.value)}>
      { 
        regions.length > 0  ? regions.map(region=>{return <MenuItem key={region.code} value={region.code}>{region.label}</MenuItem>})
        : <CircularProgress/>
      }
      </Select></FormControl>


      <Typography gutterBottom>Street</Typography>
      <TextField label="Street name and house number" fullWidth value={street} onChange={(e)=>setStreet(e.target.value)}/>

      <Typography gutterBottom>Zipcode</Typography>
      <TextField label="Zipcode" fullWidth value={zipcode} onChange={(e)=>setZipcode(e.target.value)}/>

      <Typography gutterBottom>Town</Typography>
      <TextField label="Town" fullWidth value={town} onChange={(e)=>setTown(e.target.value)}/>
    </form>
  );
}

function CheckoutProductSummary({product}){
  return(
    <div className="checkout-product-summary">
    <Typography variant="subtitle1">{product.name || "Coffee"} x {product.quantity}</Typography>
    <Typography variant="subtitle1">{product.price.formatted_with_symbol || ""}</Typography>
    </div>
  )
}

// function StripeCheckoutForm(){
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePayment=async(e)=>{
//     e.preventDefault();
//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url:"http://localhost:3000/checkout",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     } 
//   }


//   return(
//     <form onSubmit={(e)=>{handlePayment(e)}}>
//     <CardElement options={{hidePostalCode:true}} ele/>
//     <button>Submit/Pay</button>      
//     </form>
//   )
// }