import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://43.201.21.135/api",

  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2NzE1Mzk5MjgsImV4cCI6MTY3MTU0MzUyOH0.U82oX1jRGThSnbIIP0m3kTMGbzxd2zW-fddIh4aD790`,
    "Content-Type": "multipart/form-data",
  },

  timeout: 1000,
});

export const getAsyncUser = createAsyncThunk(
  "main/getAsyncUser",
  async (payload, thunkAPI) => {
    try {
      const diary = await instance.get(`/diary`);
      const userinfo = await instance.get(`/userinfo/${payload}`);

      if (diary.status === 200 && userinfo.status === 200) {
        return { diary: diary.data, userinfo: userinfo.data };
      } else {
        thunkAPI.rejectWithValue([], { messege: "error" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue([], error);
    }
  }
);
// export const getAsyncDiary = createAsyncThunk();

const initialState = {
  data: {
    diary: [],
    userinfo: {},
  },
  loading: false,
  error: true,
};

export const mainpageSlice = createSlice({
  name: "mainpage",
  initialState,
  reducers: {},
  extraReducers: {
    [getAsyncUser.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    [getAsyncUser.pending]: (state, action) => {
      return {
        ...state,
        data: {
          diary: [],
          userinfo: {},
        },
        loading: true,
      };
    },
    [getAsyncUser.rejected]: (state, action) => {
      return {
        ...state,
        data: {
          diary: [],
          userinfo: {},
        },
        loading: false,
        error: action.error,
      };
    },
  },
});

export const {} = mainpageSlice.actions;
export default mainpageSlice.reducer;
