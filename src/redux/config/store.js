import { configureStore } from "@reduxjs/toolkit";
import diarys from "../module/diarysSlice";

const store = configureStore({ reducer: { diarys } });

export default store;
