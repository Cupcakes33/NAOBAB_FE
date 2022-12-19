import { configureStore } from "@reduxjs/toolkit";
import mainpageReducer from "../module/mainpageSlice";
import loginReducer from "../module/loginSlice";
import diarysReducer from "../module/diarysSlice";

export const store = configureStore({

  reducer: { user: loginReducer, diarys: diarysReducer, mainpage: mainpageReducer },

});
