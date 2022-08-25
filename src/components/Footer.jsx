import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <footer>
      <div>
        <section>
          <Typography variant="h5">All regarding purchase</Typography>
          <Typography>Business Terms</Typography>
          <Typography>GDPR</Typography>
          <Typography>My Account</Typography>
        </section>

        <section>
          <Typography variant="h5">Company</Typography>
          <Typography>Contact</Typography>
          <Typography>Wholesale collaboration</Typography>
        </section>
        <section>
          <Typography variant="h5">Contact us</Typography>
          <Typography className="t">Address:</Typography>
          <Typography>Some address 123, Zipcode, City</Typography>
          <Typography className="t">Contact email:</Typography>
          <Typography>example@example.com</Typography>

          <Typography className="t">Contact Number:</Typography>
          <Typography>+412 123 456 789</Typography>

          <Typography className="t">Opening Hours:</Typography>
          <Typography>Mo - Fri 8:00 - 16:00</Typography>
          <Typography>Sat - Sun : <span style={{color:"red"}}>Closed</span></Typography>
        </section>
      </div>

      <div className="links">
        <div>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
        <Typography>LOGO HERE</Typography>
      </div>
    <section className="copyright">
    <Typography>Copyright &copy; 2022 - {new Date().getFullYear()} cofferia.com 
    | Made by <Link to='https://github.com/michalzard'>Michalzard</Link></Typography>
    </section>
    </footer>
  );
}

export default Footer;
