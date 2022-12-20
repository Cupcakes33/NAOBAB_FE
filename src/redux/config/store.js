import { configureStore } from "@reduxjs/toolkit";
import mainpageReducer from "../module/mainpageSlice";
import loginReducer from "../module/loginSlice";
import diariesReducer from "../module/diariesSlice";

export const store = configureStore({
  reducer: {
    user: loginReducer,
    diaries: diariesReducer,
    mainpage: mainpageReducer,
  },
});
