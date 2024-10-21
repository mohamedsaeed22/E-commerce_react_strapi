import {   Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CartDrawer from "../components/CartDrawer";

const AppLayout = ( ) => {
  return (
    <>
      <Navbar />
      <CartDrawer/>
      <Outlet />
    </>
  );
};

export default AppLayout;
