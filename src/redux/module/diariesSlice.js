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
      console.log(payload);
      const detail = await instance.get(`api/diary/${payload}`);
      const diary = detail.data.diary;
      const weatherAPI = JSON.parse(diary.weather);

      return thunkAPI.fulfillWithValue({ diary, weatherAPI });
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
      console.log(payload);
      await instance.put(`api/diary/${payload.diaryId}`, {
        //payload에 제목,내용 수정값
        title: payload.title,
        content: payload.content,
      });

      return thunkAPI.fulfillWithValue({
        title: payload.title,
        content: payload.content,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//delete diary
export const __deleteDiaries = createAsyncThunk(
  "DELETE_DIARY",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await instance.delete(`api/diary/${payload}`);
      console.log(data);
      if (data.status === 201) {
        alert("일기가 사라졌어요!");
        window.location.replace("http://naobab-fe-ky2k.vercel.app/mainpage");
      }
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
      state.diaries = {
        title: action.payload.title,
        content: action.payload.content,
      };
    },
    [__putDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete diary
    [__deleteDiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diaries = state.diaries.filter(
        (item) => item.id !== action.payload
      );
    },
    [__deleteDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diariesSlice.reducer;
