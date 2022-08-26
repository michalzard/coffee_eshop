import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header() {
  return (
    <header>
      <section>
      <Typography>Logo</Typography>
        <Link to="/">
          <Typography>Home</Typography>
        </Link>
        <Link to="/fresh-coffee">
          <Typography className="coffee">Fresh Coffee</Typography>
        </Link>

        <Link to="/about-us">
          <Typography>About</Typography>
        </Link>
        <Link to="/contact">
          <Typography>Contact</Typography>
        </Link>
        <Link to="/my-account">
          <Typography>Account</Typography>
          <ArrowDropDownIcon/>
        </Link>
      </section>
    </header>
  );
}

export default Header;
