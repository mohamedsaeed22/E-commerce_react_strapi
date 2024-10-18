import { createSlice } from "@reduxjs/toolkit";
import { actLogin } from "./act/actLogin";
import { createStandaloneToast } from "@chakra-ui/react";
import cookieService from "../../services/cookieService";
const { toast } = createStandaloneToast();

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        const date = new Date();
        date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
        const option = {
          path: "/",
          expires: date,
        };
        cookieService.set("token", action.payload.jwt, option);
        toast({
          title: "login success.",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .addCase(actLogin.rejected, (state, action) => {
        console.log(action);
        toast({
          title: action?.payload?.error?.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
