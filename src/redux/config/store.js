import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../module/loginSlice";

export const store = configureStore({
  reducer: { user: loginSlice },
});
