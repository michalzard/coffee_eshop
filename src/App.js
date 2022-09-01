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
} from "../src/components/index";
import { useEffect } from "react";
// import { fetchProducts } from "./controllers/products";
// import { addToCart, cartItems, fetchCart } from "./controllers/cart";

function ScrollToTop() {
  //on every pathname change scroll to top to display important things
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
}

function App() {
  // useEffect(() => {
  //   let isSubscribed = true;

  //   async function getProducts() {
  //     const products = await fetchProducts();
  //     const cart = await fetchCart();
  //     // const contents = await cartContents();
  //     if (isSubscribed) {
  //       //handle response
  //       console.log(products,cart);
  //     }
  //   }
  //   getProducts();
  //   return () => (isSubscribed = false);
  // }, []);
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
        <Route
          path="my-account"
          element={
            <div style={{ color: "red", fontSize: "30px" }}>Login Stuff</div>
          }
        />

        <Route path="product/:id" element={<ProductOrder />} />

        <Route
          path="*"
          element={
            <div style={{ color: "red", fontSize: "30px" }}>NOT FOUND</div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
