import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "../src/styles/App.scss";
import Carousel from "./components/Carousel";

function App() {
  return <div className="App">
  <Header/>
  <Routes>
    <Route path="/" element={
    <Carousel/>
    }/>
  </Routes>
  </div>
}

export default App;
