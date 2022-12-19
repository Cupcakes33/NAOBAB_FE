import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../module/loginSlice";
import diarysReducer from "../module/diarysSlice";

export const store = configureStore({
  reducer: { user: loginReducer, diarys: diarysReducer },
});
