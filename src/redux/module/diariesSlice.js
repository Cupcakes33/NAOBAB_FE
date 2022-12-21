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
  "GET_WHEATHER",
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

//get diary
export const __getDiaries = createAsyncThunk(
  "GET_DIARY",
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

//put diary
export const __putDiaries = createAsyncThunk(
  "PUT_DIARY",
  async (payload, thunkAPI) => {
    try {
      await instance.put(`api/diary/${payload.id}`, {
        //payload에 제목,내용 수정값이랑 id
        title: payload.title,
        content: payload.content,
      });

      return thunkAPI.fulfillWithValue({
        id: payload.id,
        title: payload.title,
        content: payload.content,
      });
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

    //put diary
    [__putDiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [__putDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diaries = state.diaries.map((el) =>
        el.id === action.payload.id
          ? { title: action.payload.title, content: action.payload.content }
          : el
      );
    },
    [__putDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diariesSlice.reducer;
