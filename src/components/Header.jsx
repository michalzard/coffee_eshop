import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, Menu, MenuItem, SwipeableDrawer } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { fetchCart } from "../controllers/eccommerce/cart";
import {ReactComponent as EmptyCartIcon} from "../assets/empty_cart.svg";
import { Close } from "@mui/icons-material";
import { UserLogout } from "../controllers/store/reducers/authReducers";


function Header() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [secondaryMenuAnchor,setSecondaryAnchor] = useState(null);
  const [cartAnchor,setCartAnchor] = useState(null);

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
            <MenuItem key={4} >
                  <ShoppingCartIcon className="cartBtn" onClick={(e) => setCartAnchor(e.currentTarget)} />
            </MenuItem>
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
          <Cart anchor={cartAnchor} setCartAnchor={setCartAnchor}/>
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
                <ShoppingCartIcon className="cartBtn" onClick={(e) => setCartAnchor(e.currentTarget)}/>
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
            <Cart anchor={cartAnchor} setCartAnchor={setCartAnchor}/>
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
   dispatch(UserLogout());
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

function Cart({anchor , setCartAnchor}){
  const [cart,setCart] = useState({});
  //TODO: fetch only when logged in 
  useEffect(()=>{
  let isSubscribed = true;
  async function loadCartData(){
  const cart = await fetchCart();
  console.log(cart);
  if(isSubscribed) setCart(cart);//asyncthunk
  }
  loadCartData();
  return ()=> isSubscribed = false;
  },[]);

  return(
    <SwipeableDrawer
    anchor={"right"}
    open={Boolean(anchor)}
    onClose={()=>setCartAnchor(null)}
    onOpen={()=>setCartAnchor(anchor)}
    >
    <section className="cart-container">
    {
      cart.total_items > 0 ? <>here goes product list</>
      : <EmptyCart setAnchor={setCartAnchor}/>
    }
    </section>
    </SwipeableDrawer>
  )
}

function EmptyCart({setAnchor}){
  return(
    <section className="cart-empty">
    <Close className="closeIcon" onClick={()=>{setAnchor(null)}}/>
    <EmptyCartIcon className="empty-icon"/>
    <Typography variant="h5" gutterBottom>No products in cart.</Typography>
    <Link to="/fresh-coffee"><Typography variant="h6" onClick={()=>{setAnchor(null)}}>Continue shopping</Typography></Link>
    </section>
  )
}