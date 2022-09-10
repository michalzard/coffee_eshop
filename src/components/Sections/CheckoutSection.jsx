import { TextField, Typography } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import "../../styles/components/Sections/CheckoutSection.scss";
import AddressForm from '../Forms/AddressForm';


function CheckoutSection({isLoggedIn}) {
  return (
      <section className='checkout-container'>
    {
        isLoggedIn ? 
        <>
        <Typography variant='h4'>Checkout</Typography>
        <div className="checkout">
        <section className="billing-info">
        {/* Billing Info
        Name
        Country/Region    
        Street
        Zipcode
        Town
        Phone number
        Email    
        Note/Comment to the order */}
        <Typography>Billing Information</Typography>
        <TextField label="First Name"/>
        <TextField label="Surname"/>
        <AddressForm/>
        <TextField label="Phone number" type="number"/>
        <TextField label="Email"/>
        </section>
        <section className="order-info">
        <Typography>Your order</Typography>
        {/* product list 
        Product        Subtotal
        name x num      price
        desc

        bottom border
        subtotal    price alltogether
        
        ----------------------------------
        Delivery -> personal collection , courier
        payment method ->
        stripe integration
        personal collection
        
        Your personal data will be process -blah blah blah

        checkbox to confirm that cx aggrees with general terms and conditions
        Button order with payment obligation
        */}
        </section>
        </div>
        </>
        : <Navigate to="/my-account"/>
    }
    </section>
  )
}

export default CheckoutSection