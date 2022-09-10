import React from 'react'
import "../../styles/components/Forms/AddressForm.scss";
import { TextField } from '@mui/material';


function AddressForm() {
  return (
    <form className="address-form">
      <TextField label="Country/Region" />
      <TextField label="Street" />
      <TextField label="Zipcode" />
      <TextField label="Town" />
    </form>
  )
}

export default AddressForm;