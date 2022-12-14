import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../src/styles/App.scss";
import {Header,Footer,Carousel,DeliverySection,AboutUsSection,LatestProducts,FavouriteProducts,Contact,About,FreshCoffee,ProductOrder,Login,NotFound,AccountDetails,AccountDetailsContainer,PaymentMethodsContainer,AddressContainer,OrdersContainer} from "../src/components/index";
import { useDispatch } from "react-redux";
import { store } from "./controllers/store/store";
import { LoadSession } from "./controllers/store/reducers/authReducers";
import { getAllProducts } from "./controllers/store/reducers/productReducers";
import CheckoutSection from "./components/Sections/CheckoutSection";

function ScrollToTop() {
  //on every pathname change scroll to top to display important things
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    // document.body.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadSession()); 
  }, [dispatch]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  store.subscribe(() => {
    const { isLoggedIn } = store.getState().authState;
    setIsLoggedIn(isLoggedIn);
  });

  useEffect(() => {
    let isSubsribed = true;
    async function getProducts() {
     if(isSubsribed) dispatch(getAllProducts());
    }
    getProducts();
    return () => { isSubsribed = false };
  }, [dispatch]);

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
              <LatestProducts/>
              <FavouriteProducts/>
              <AboutUsSection />
            </>
          }
        />

        <Route path="contact" element={<Contact />} />
        <Route path="about-us" element={<About />} />
        <Route path="fresh-coffee" element={<FreshCoffee isLoggedIn={isLoggedIn} />} />

        <Route
          path="my-account"
          element={isLoggedIn ? <AccountDetails /> : <Login />}
        >
          <Route index element={<AccountDetailsContainer />} />
          <Route path="payment-methods" element={<PaymentMethodsContainer />} />
          <Route path="address" element={<AddressContainer />} />
          <Route path="orders" element={<OrdersContainer />} />
        </Route>
        <Route path="/checkout" element={<CheckoutSection isLoggedIn={isLoggedIn} />}/>

        <Route path="product/:id" element={<ProductOrder isLoggedIn={isLoggedIn}/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
