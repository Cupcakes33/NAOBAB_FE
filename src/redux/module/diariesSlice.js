import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  headers: {
    processData: false,
    contentType: "multipart/form-data",
  },
});
const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

instance.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = getToken();
  return config;
});

instance.interceptors.response.use(async (response) => {
  response.headers["Authorization"] = getToken();
  return response;
});
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
        key: `${process.env.REACT_APP_WEATHER_KEY}`,
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
// //add diary
// export const __addDiaries = createAsyncThunk(
//   "ADD_DIARY",
//   async (data, thunkAPI) => {
//     try {
//       const diary = JSON.parse(data);

//       const diaryData = await instance.post("api/diary", {
//         title: diary.title,
//         content: diary.content,
//         image: diary.image,
//         // weather: diary.weather,
//       });
//       return thunkAPI.fulfillWithValue(diary);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

//get diary
export const __getDiaries = createAsyncThunk(
  "get_diary",
  async (payload, thunkAPI) => {
    try {
      const diary = await instance.get(`api/diary/48`);
      console.log(diary);
      return thunkAPI.fulfillWithValue(diary.data);
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

    // //add diary
    // [__addDiaries.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__addDiaries.fulfilled]: (state, action) => {
    //   console.log(state);
    //   console.log(action);
    //   state.isLoading = false;
    //   state.diaries = [...state.diaries, action.payload];
    // },
    // [__addDiaries.rejected]: (state, action) => {
    //   console.log(state);
    //   console.log(action);
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    //get diary
    [__getDiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diary = action.payload;
    },
    [__getDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diariesSlice.reducer;
