import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  diarys: [],
  diary: {
    title: "",
    content: "",
    image: "",
    weather: {
      city: "",
      weather: "",
      icon: "",
      temp: "",
    },
  },
  isLoading: false,
  error: null,
};

//날씨API GET
export const __getWeather = createAsyncThunk(
  "getWeather",
  async (payload, thunkAPI) => {
    try {
      const api = {
        key: "e24f562135ff4b7941d7c0737f4fe4d1",
        base: "https://api.openweathermap.org/data/2.5/",
      };
      const request = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${api.key}`
      );
      const city = request.data.name;
      const weather = request.data.weather[0].main;
      const icon = request.data.weather[0].icon;
      const temp = request.data.main.temp;
      return thunkAPI.fulfillWithValue({ city, weather, icon, temp });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//add diary
export const __addDiarys = createAsyncThunk(
  "ADD_DIARY",
  async (diary, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/diarys", diary);
      return thunkAPI.fulfillWithValue(diary);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get diary
export const __getDiarys = createAsyncThunk(
  "get_diary",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/diarys");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const diarysSlice = createSlice({
  name: "diarys",
  initialState,
  reducers: {},
  extraReducers: {
    //get weather
    [__getWeather.pending]: (state) => {
      state.isLoading = true;
    },
    [__getWeather.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diary.weather = action.payload;
    },
    [__getWeather.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //add diary
    [__addDiarys.pending]: (state) => {
      state.isLoading = true;
    },
    [__addDiarys.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diarys = [...state.diarys, action.payload];
    },
    [__addDiarys.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get diary
    [__getDiarys.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDiarys.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diarys = action.payload;
    },
    [__getDiarys.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diarysSlice.reducer;
