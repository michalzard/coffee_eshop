import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "../../styles/components/Account/AccountDetails.scss";
import { store } from "../../controllers/store/store";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from "axios";
import { BASE_URI } from "../../lib/base_uri";
import { useDispatch } from "react-redux";
import { logout } from "../../controllers/store/authSlice";
import { Outlet, useNavigate } from "react-router-dom";


function AccountDetails() {
  // const [display, setDisplay] = useState("account-details");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // const contentBasedOnDisplay = (d) => {
  //   switch (d) {
  //     case "account-details": return <AccoundDetailsContainer />;
  //     case "payment-methods": return  <PaymentMethodsContainer />;
  //     case "address": return  <AddressContainer />;
  //     case "orders": return <OrdersContainer />;
  //     default: return <AccoundDetailsContainer />;
  //   }
  // }
  const submigLogout=()=>{
    axios.post(`${BASE_URI}/auth/logout`,{},{withCredentials:true}).then(data=>{
      const {message} = data.data;
      if(message) dispatch(logout());
    })
  }


  return (
    <div className="account-details">
      <Typography variant="h2" className="title">Account Details</Typography>
      <article className="account-content">
        <section className="sidebar">
          <Button variant="text" onClick={()=>{navigate("/my-account");}}>Account Details</Button>
          <Button variant="text" onClick={()=>{navigate("/my-account/payment-methods");}}>Payment Methods</Button>
          <Button variant="text" onClick={()=>{navigate("/my-account/address");}}>Address</Button>
          <Button variant="text" onClick={()=>{navigate("/my-account/orders");}}>Orders</Button>
          <Button variant="text" onClick={submigLogout}>Logout</Button>
        </section>
        <section className="desc"><Outlet/></section>
      </article>
    </div>
  );
}

export default AccountDetails;

export function AccountDetailsContainer() {
  const user = store.getState().authState.user;
  const [nickname,setNickname] = useState(user.displayName || "");
  const [email,setEmail] = useState(user.email || "");
  const [newPassword,setNewPassword] = useState("");
  const [verifyPassword,setVerifyPassword] = useState("");
  
  const handleOnChange=(e,value)=>{
    switch(value){
      case "nickname": setNickname(e.target.value); break;
      // case "surname": setSurname(e.target.value); break;
      case "email": setEmail(e.target.value); break;
      case "newPassword": setNewPassword(e.target.value); break;
      case "verifyPassword": setVerifyPassword(e.target.value); break;
      default: break;
    }
  }

  const submitInfoUpdate=()=>{
    // axios.post(`${BASE_URI}/update`)
  }
  // const passwordMatch=(pw1,pw2)=>{
  //   return pw1 === pw2 && pw1.length>0 && pw2.length>0;
  // }
  return (
    <>
      <Typography variant="h4" gutterBottom>Account Information</Typography>
      <section className="user-info">
      <TextField label="Nickname" value={nickname} onChange={(e)=>{handleOnChange(e,"nickname")}} />
      
      <TextField label="Email" value={email} onChange={(e)=>{handleOnChange(e,"email")}}/>
      </section>
      <section className="password-change">
      <Typography variant="h4" gutterBottom>Password Reset</Typography>
      <TextField placeholder="new password (leave empty if you dont want to reset)" value={newPassword}
      onChange={(e)=>{handleOnChange(e,"newPassword")}}/>
      <TextField placeholder="verify password (leave empty if you dont want to reset)" value={verifyPassword}
      onChange={(e)=>{handleOnChange(e,"verifyPassword")}}/>
      </section>
      <Button variant="contained" >Save changes</Button>
    </>
  );
}

export function PaymentMethodsContainer() {

  //STRIPE INTEGRATION
  //check with stripe if customer's card was saved if not show notfound
  //if yes show element where they can change it
  return (
    <section className="payment-method-container">
      <Typography variant="h4" gutterBottom>Payment Methods</Typography>
      <PaymentMethodNotFound/>
      <Button variant="contained">Add Payment method</Button>
    </section>
    /**
     * Integrate this section using STRIPE
     * div with option to add cards
     * display "saved" card
     * <Button variant="contained">Add Payment method</Button>
     */
  );
}

export function PaymentMethodNotFound(){
  return(
    <div className="payment-method-notfound">
    <DisabledByDefaultIcon/><Typography>No payment methods were found.</Typography>
    </div>
  )
}

export function AddressContainer() {
  return (
    <section className="address-containter">
      <Typography variant="h4">ADDRESS</Typography>
      <Typography>Delivery Address</Typography>
      <TextField label="Country/Region" />
      <TextField label="Street" />
      <TextField label="Zipcode" />
      <TextField label="Town" />
      <Button variant="contained">Save changes</Button>
      
    </section>
  );
}

export function OrdersContainer() {
  return (
    <section className="order-container">
      <Typography variant="h4">ORDERS</Typography>
      <Typography>List of All orders for specific user</Typography>
    </section>
  );
}
