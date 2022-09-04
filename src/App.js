import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../src/styles/App.scss";
import {
  Header,
  Footer,
  Carousel,
  DeliverySection,
  AboutUsSection,
  LatestProducts,
  FavouriteProducts,
  Contact,
  About,
  FreshCoffee,
  ProductOrder,
  Login,
  NotFound,
  AccountDetails,
  AccountDetailsContainer,
  PaymentMethodsContainer,
  AddressContainer,
  OrdersContainer,
} from "../src/components/index";
import axios from "axios";
import { BASE_URI } from "./lib/base_uri";
import { useDispatch } from "react-redux";
import { store } from "./controllers/store/store";
import { onSessionLoad } from "./controllers/store/authSlice";

function ScrollToTop() {
  //on every pathname change scroll to top to display important things
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubsribed = true;

    if (isSubsribed) {
      axios
        .get(`${BASE_URI}/auth/session`, { withCredentials: true })
        .then((data) => {
          const { user } = data.data;
          dispatch(onSessionLoad({ user }));
        })
        .catch((err) => console.log(err));
    }
    return () => (isSubsribed = false);
  }, [dispatch]);

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  store.subscribe(()=>{
    const {isLoggedIn} = store.getState().authState;
    setIsLoggedIn(isLoggedIn);
  })

  

  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <DeliverySection />
              <LatestProducts />
              <FavouriteProducts />
              <AboutUsSection />
            </>
          }
        />

        <Route path="contact" element={<Contact />} />
        <Route path="about-us" element={<About />} />
        <Route path="fresh-coffee" element={<FreshCoffee />} />

        <Route path="my-account" element={isLoggedIn ? <AccountDetails /> :<Login />}>
          <Route index element={<AccountDetailsContainer />} />
          <Route path="payment-methods" element={<PaymentMethodsContainer/>} />
          <Route path="address" element={<AddressContainer/>} />
          <Route path="orders" element={<OrdersContainer />} />
        </Route>

        <Route path="product/:id" element={<ProductOrder />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
