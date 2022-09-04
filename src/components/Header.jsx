import React, { useState } from "react";
import { Typography, useMediaQuery, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import { store } from "../controllers/store/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { BASE_URI } from "../lib/base_uri";
import { useDispatch } from "react-redux";
import { logout } from "../controllers/store/authSlice";

function Header() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [secondaryMenuAnchor,setSecondaryAnchor] = useState(null);
  const closeMenu = () => setMenuAnchor(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  store.subscribe(() => {
    const { isLoggedIn } = store.getState().authState;
    setIsLoggedIn(isLoggedIn);
  });

  return (
    <header>
      {isMobile ? (
        <section className="header_section">
          <Link to="/">
            <Typography>Logo</Typography>
          </Link>

          <MenuIcon
            onClick={(e) => {
              setMenuAnchor(e.currentTarget);
            }}
          />
          <Menu
            id="navMenu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
          >
              <Link to="/"> 
            <MenuItem key={0} onClick={closeMenu}>
              Home
            </MenuItem>
               </Link>
              <Link to="/fresh-coffee">
            <MenuItem key={1} onClick={closeMenu}>
                Fresh Coffee
            </MenuItem>
                </Link>
              <Link to="/about-us">
            <MenuItem key={2} onClick={closeMenu}>
                About
            </MenuItem>
                </Link>
              <Link to="/contact">
            <MenuItem key={3} onClick={closeMenu}>
                Contact
            </MenuItem>
                </Link>
              {isLoggedIn ? (
                <Link to="/cart">
            <MenuItem key={4} >
                  <ShoppingCartIcon />
            </MenuItem>
                </Link>
              ) : null}

            <MenuItem key={5} onClick={(e) => setSecondaryAnchor(e.currentTarget)}>
                Account
                <ArrowDropDownIcon />
            </MenuItem>
          </Menu>
          <AccountMenu
              menuAnchor={secondaryMenuAnchor}
              closeMenu={()=>{setSecondaryAnchor(null)}}
            />
        </section>
      ) : (
        <section className="header_section">
          <Typography>Logo</Typography>

          <section className="h_links">
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
            {isLoggedIn ? (
              <Link to="/cart">
                <ShoppingCartIcon />
              </Link>
            ) : null}

            <section
              className="account-btn"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <Typography>Account</Typography>
              <ArrowDropDownIcon />
            </section>
            {/* DESKTOP MENU */}
            <AccountMenu
              menuAnchor={menuAnchor}
              closeMenu={closeMenu}
            />
          </section>
        </section>
      )}
    </header>
  );
}

export default Header;

function AccountMenu({ menuAnchor, closeMenu }) {
  const dispatch = useDispatch();
  const submigLogout=()=>{
    axios.post(`${BASE_URI}/auth/logout`,{},{withCredentials:true}).then(data=>{
      const {message} = data.data;
      if(message) dispatch(logout());
    })
  }
  return (
    <Menu
      id="navMenu"
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      disableScrollLock={true}
      onClose={closeMenu}
    >
      <MenuItem key={0} onClick={closeMenu}>
        <Link to="/my-account">
          <AccountCircleIcon />
          My Account
        </Link>
      </MenuItem>
      <MenuItem key={1} onClick={closeMenu}>
        <Link to="/my-account">
          <ManageAccountsIcon />
          Account Details
        </Link>
      </MenuItem>
      <MenuItem key={2} onClick={closeMenu}>
        <Link to="/my-account/orders">
          <ListAltIcon />
          Orders
        </Link>
      </MenuItem>
      <MenuItem key={3} onClick={()=>{submigLogout();closeMenu();}}>
        <Link to="/my-account">
          <LogoutIcon />
          Logout
        </Link>
      </MenuItem>
     
    </Menu>
  );
}
