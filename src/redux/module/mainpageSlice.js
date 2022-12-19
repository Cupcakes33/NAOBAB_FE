import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const instance = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "http://13.125.255.119/",
  timeout: 1000,
});

export const getAsyncUser = createAsyncThunk(
  "main/getAsyncUser",
  async (payload, thunkAPI) => {
    try {
      const diary = await instance.get(`api/diary`);
      const userinfo = await instance.get(`api/userinfo/${payload}`);

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
