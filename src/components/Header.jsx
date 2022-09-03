import React, { useState } from "react";
import { Typography, useMediaQuery, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { store } from "../controllers/store/store";

function Header() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const closeMenu = () => setMenuAnchor(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  store.subscribe(() => {
    const {isLoggedIn} = store.getState().authState;
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
            <MenuItem onClick={closeMenu}>
              <Link to="/"> Home </Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/fresh-coffee">Fresh Coffee</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/about-us">About</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/contact">Contact</Link>
            </MenuItem>
            <MenuItem>
              {isLoggedIn ? (
                <Link to="/cart">
                  <ShoppingCartIcon />
                </Link>
              ) : null}
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/my-account">
                Account
                <ArrowDropDownIcon />
              </Link>
            </MenuItem>
          </Menu>
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

            <Link to="/my-account">
              <Typography>Account</Typography>
              <ArrowDropDownIcon />
            </Link>
          </section>
        </section>
      )}
    </header>
  );
}

export default Header;
