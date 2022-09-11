import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { store } from '../../controllers/store/store';
import "../../styles/components/Sections/CheckoutSection.scss";


function CheckoutSection({isLoggedIn}) {
  const [cart,loadCart] = useState([]);
  store.subscribe(()=>{
    const cart = store.getState().cart;
    if(cart) loadCart(cart);
  });
  
  const [firstName,setFirstName] = useState("");
  const [surname,setSurname] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [email,setEmail] = useState("");
  const [orderNote,setOrderNote] = useState("");

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
        <AddressForm/>
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
        <Typography>Product</Typography>
        <Typography>Subtotal</Typography>
        </section>
        <section className="cart-items">
        {
          cart ? cart.items.map((item,i)=>{return <CheckoutProductSummary key={i} product={item}/>}) : null
        }
        </section>

        <hr/>
        <Typography>Subtotal {cart.subtotal.formatted_with_symbol || "0"}</Typography>
        <Typography>Delivery</Typography>
        <section className="checkout-delivery">
        <Typography>Personal Collection <Checkbox/> </Typography>
        <Typography>Courrier Name <Checkbox/> </Typography>
        </section>
        <Typography>I have read and agree to the general terms and conditions. <Checkbox/> </Typography>
        <Button variant="contained">Order with payment obligation</Button>
        </article>
        </div>
        </>
        : <Typography>Not Logged in , Display some error text</Typography>
    }
    </section>
  )
}

export default CheckoutSection;

function AddressForm() {
  return (
    <form className="address-form">
      <Typography gutterBottom>Country/Region</Typography>
      <TextField label="Country/Region" fullWidth/>

      <Typography gutterBottom>Street</Typography>
      <TextField label="Street name and house number" fullWidth/>

      <Typography gutterBottom>Zipcode</Typography>
      <TextField label="Zipcode" fullWidth/>

      <Typography gutterBottom>Town</Typography>
      <TextField label="Town" fullWidth/>
    </form>
  );
}

function CheckoutProductSummary({product}){
  return(
    <div className="checkout-product-summary">
    <Typography variant="subtitle1">{product.name || "Coffee"}  {product.price.formatted_with_symbol || ""}</Typography>
    </div>
  )
}