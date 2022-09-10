import React from 'react';
import {Typography} from "@mui/material";
import "../../styles/components/Sections/Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Contact() {
return (
<section className="contact">
<Typography variant="h3" gutterBottom> CONTACT</Typography>
<div className="content">

<section className="info">
<Typography variant="h4" gutterBottom>Cofferia</Typography>
  <Typography>Some address 123, Zipcode, City</Typography>
  <Typography className="t">Contact email:</Typography>
  <Typography>example@example.com</Typography>

  <Typography className="t">Contact Number:</Typography>
  <Typography>+412 123 456 789</Typography>

  <Typography className="t">Opening Hours:</Typography>
  <Typography>Mo - Fri 8:00 - 16:00</Typography>
  <Typography>Sat - Sun : <span style={{color:"red"}}>Closed</span></Typography>
  <div className="links longer">
    <div>
      <FacebookIcon />
      <TwitterIcon />
      <InstagramIcon />
    </div>
  </div>

</section>
<div className="mapouter">
<div className="gmap_canvas">
<iframe title="example_map" id="gmap_canvas" src="https://maps.google.com/maps?q=Coffee&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
</div>
</div>

</div>

</section>
  )
}

export default Contact;