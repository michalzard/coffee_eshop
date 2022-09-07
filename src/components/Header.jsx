import React, { useEffect, useState } from "react";
import {
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  SwipeableDrawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import { store } from "../controllers/store/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { ReactComponent as EmptyCartIcon } from "../assets/empty_cart.svg";
import { Close } from "@mui/icons-material";
import { UserLogout } from "../controllers/store/reducers/authReducers";
import { CartRetrieve } from "../controllers/store/reducers/cartReducers";
import Badge from "@mui/material/Badge";

function Header() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [secondaryMenuAnchor, setSecondaryAnchor] = useState(null);
  const [cartAnchor, setCartAnchor] = useState(null);
  const closeMenu = () => setMenuAnchor(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const [cart, setCart] = useState(0);

  store.subscribe(() => {
    const { isLoggedIn } = store.getState().authState;
    const cart = store.getState().cart;
    if (cart) setCart(cart);
    setIsLoggedIn(isLoggedIn);
  });

  useEffect(() => {
    dispatch(CartRetrieve()); //Load initial cart state
  }, [dispatch]);
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
              <MenuItem key={4}>
                <Badge badgeContent={cart ? cart.total_items : 0} color="primary" max={99}>
                  <ShoppingCartIcon
                    className="cartBtn"
                    onClick={(e) => setCartAnchor(e.currentTarget)}
                  />
                </Badge>
              </MenuItem>
            ) : null}

            <MenuItem
              key={5}
              onClick={(e) => setSecondaryAnchor(e.currentTarget)}
            >
              Account
              <ArrowDropDownIcon />
            </MenuItem>
          </Menu>
          <AccountMenu
            menuAnchor={secondaryMenuAnchor}
            closeMenu={() => {
              setSecondaryAnchor(null);
            }}
          />
          <Cart
            anchor={cartAnchor}
            cartObject={cart}
            setCartAnchor={setCartAnchor}
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
              <Badge badgeContent={cart ? cart.total_items : null} className="cartBadge" max={99}>
                <ShoppingCartIcon
                  className="cartBtn"
                  onClick={(e) => setCartAnchor(e.currentTarget)}
                />
              </Badge>
            ) : null}

            <section
              className="account-btn"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <Typography>Account</Typography>
              <ArrowDropDownIcon />
            </section>
            {/* DESKTOP MENU */}
            <AccountMenu menuAnchor={menuAnchor} closeMenu={closeMenu} />
            {cartAnchor ? (
              <Cart
                anchor={cartAnchor}
                cartObject={cart}
                setCartAnchor={setCartAnchor}
              />
            ) : null}
          </section>
        </section>
      )}
    </header>
  );
}

export default Header;

function AccountMenu({ menuAnchor, closeMenu }) {
  const dispatch = useDispatch();
  const submigLogout = () => {
    dispatch(UserLogout());
  };
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
      <MenuItem
        key={3}
        onClick={() => {
          submigLogout();
          closeMenu();
        }}
      >
        <Link to="/my-account">
          <LogoutIcon />
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );
}

function Cart({ anchor, setCartAnchor, cartObject }) {
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={Boolean(anchor)}
      onClose={() => setCartAnchor(null)}
      onOpen={() => setCartAnchor(anchor)}
    >
      <section className="cart-container">
        <Close
          className="closeIcon"
          onClick={() => {
            setCartAnchor(null);
          }}
        />
        {cartObject ? (
          cartObject.items.length > 0 ? (
            <Typography>Product List</Typography>
          ) : (
            <EmptyCart setAnchor={setCartAnchor} />
          )
        ) : null}
      </section>
    </SwipeableDrawer>
  );
}

function EmptyCart({ setAnchor }) {
  return (
    <section className="cart-empty">
      <EmptyCartIcon className="empty-icon" />
      <Typography variant="h5" gutterBottom>
        No products in cart.
      </Typography>
      <Link to="/fresh-coffee">
        <Typography
          variant="h6"
          onClick={() => {
            setAnchor(null);
          }}
        >
          Continue shopping
        </Typography>
      </Link>
    </section>
  );
}
