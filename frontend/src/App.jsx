import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
 
function App() {
  return <>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<Product />} />
      <Route path="about" element={<About />} />
    </Routes>
  </>;
}

export default App;
