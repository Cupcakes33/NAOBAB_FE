import { configureStore } from "@reduxjs/toolkit";
import mainpageReducer from "../module/mainpageSlice";

export const store = configureStore({
  reducer: {
    mainpage: mainpageReducer,
  },
});
