import { Routes, Route } from "react-router-dom";
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
} from "../src/components/index";

function App() {
  return (
    <div className="App">
      <Header />

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

        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="fresh-coffee" element={<FreshCoffee />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
