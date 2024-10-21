import { fadeConfig, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { networkMode } from "../store/global/networkSlice";

const InternetProvider = ({ children }) => {
   const dispatch = useDispatch();
  const toast = useToast();
  const toastRef = useRef();

  const close = () => {
    toast.closeAll(toastRef.current);
  };
  const addToast = () => {
    toastRef.current = toast({
      title: "No Internet Connection",
      description: "You are offline",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const setOnline = () => {
     dispatch(networkMode(true));
    close();
  };

  const setOffline = () => {
     dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return children;
};

export default InternetProvider;
