import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signup: [
    {
      username: "",
      nickname: "",
      password: "",
    },
  ],
  login: [
    {
      username: "",
      password: "",
    },
  ],
};

export const signUpUser = createAsyncThunk(
  "signup/signupuser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://43.201.21.135/api/signup", payload);


      return thunkAPI.fulfillWithValue(res.data.massage);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "login/signinuser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://43.201.21.135/api/login", payload);
      localStorage.clear();
      localStorage.setItem("token", res.data.accessToken);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //회원가입 Sign Up extraReducer
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
      alert("회원가입을 축하합니다!");
      // state.signup = [...state.signup, action.payload];
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [signInUser.pending]: (state) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.login = [...state.login, action.payload];
      alert("로그인이 확인되었습니다!");
      // window.location.replace("http://localhost:3000/mainpage");
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload;
      alert("로그인 정보가 일치하지 않습니다!");
    },
  },
});

export default loginSlice.reducer;
