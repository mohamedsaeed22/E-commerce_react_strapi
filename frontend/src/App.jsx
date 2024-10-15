import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="about" element={<About />} />
    </Routes>
  </>;
}

export default App;
