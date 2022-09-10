import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from "../assets/eshop-logo-dark.png";

function Footer() {
  return (
    <footer>
      <div className="info">
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
          <Typography className="highlight">Address:</Typography>
          <Typography>Some address 123, Zipcode, City</Typography>
          <Typography className="highlight">Contact email:</Typography>
          <Typography>example@example.com</Typography>

          <Typography className="highlight">Contact Number:</Typography>
          <Typography>+412 123 456 789</Typography>

          <Typography className="highlight">Opening Hours:</Typography>
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
        <img src={Logo} className="logo" alt="Logo"/>
      </div>
    <section className="copyright">
    <Typography>Copyright &copy; 2022 - {new Date().getFullYear()} cofferia.com 
    | Made by <Link to='https://github.com/michalzard'>Michalzard</Link></Typography>
    </section>
    </footer>
  );
}

export default Footer;
