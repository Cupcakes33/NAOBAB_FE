import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signup: [
    {
      username: "",
      nickname: "",
      password: "",
      // passwordConfirm: "",
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
      return thunkAPI.fulfillWithValue(res.data);
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
      state.signup = [...state.signup, action.payload];
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
      console.log(state);
      state.login = [...state.login, action.payload];
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;
