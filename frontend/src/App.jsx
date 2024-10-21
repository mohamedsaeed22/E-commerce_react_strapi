import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import cookieService from "./services/cookieService";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import AdminDashboard from "./pages/dashboard";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

function App() {
  const token = cookieService.get("token");
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<h1>categories</h1>} />
        </Route>

        <Route path="login" element={<Login isAuthenticated={token} />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
