import { Routes, Route } from "react-router-dom";
import "../src/styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import DeliverySection from "./components/Sections/DeliverySection";
import AboutUsSection from "./components/Sections/AboutUsSection";
import LatestProducts from "./components/Sections/LatestProducts";
import FavouriteProducts from "./components/Sections/FavouriteProducts";


function App() {
return <div className="App">
<Header/>

<Routes>
<Route path="/" element={<>
<Carousel/>
<DeliverySection/>
<LatestProducts/>
<FavouriteProducts/>
<AboutUsSection/>
</>
}/>
</Routes>

<Footer/>
</div>
}

export default App;
