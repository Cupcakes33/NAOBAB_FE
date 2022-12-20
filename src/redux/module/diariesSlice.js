import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  diaries: [],
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
export const __addDiaries = createAsyncThunk(
  "ADD_DIARY",
  async (diary, thunkAPI) => {
    try {
      console.log("들어오긴옴?", diary);

      // for (let key of diary.image.keys()) {
      //   console.log(key);
      // }
      // for (let value of diary.image.values()) {
      //   console.log(value);
      // }
      const response = await axios.post(
        "http://43.201.21.135/api/diary",
        {
          title: diary.title,
          content: diary.content,
          image: JSON.parse(diary.image),
          weather: diary.weather,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2NzE1Mzk5MjgsImV4cCI6MTY3MTU0MzUyOH0.U82oX1jRGThSnbIIP0m3kTMGbzxd2zW-fddIh4aD790`,
            "Content-Type": "multipart/form-data",
          },
        }

        // headers: {
        //   "Content-Type": "application/json",
        // },
      );
      console.log(response);
      return thunkAPI.fulfillWithValue(diary);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get diary
export const __getDiaries = createAsyncThunk(
  "get_diary",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://43.201.21.135/api/diary", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2NzE1Mzk5MjgsImV4cCI6MTY3MTU0MzUyOH0.U82oX1jRGThSnbIIP0m3kTMGbzxd2zW-fddIh4aD790`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const diariesSlice = createSlice({
  name: "diaries",
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
    [__addDiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [__addDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diaries = [...state.diaries, action.payload];
    },
    [__addDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get diary
    [__getDiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diaries = action.payload;
    },
    [__getDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diariesSlice.reducer;
