import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
let token = localStorage.getItem("token") || "";
// 쿠키 저장 될 때 ?
// 로그인 포스트를 보내면 응답 객체에 토큰이 담겨온다.
// 그 토큰을 셋 스토리지로 로컬스토리지에 저장.
// 메인페이지 : 토큰이 없으면 ? localStorage ->
// useEffect 로 토큰이 없으면 navigator.push("/login")
// ProtectedRouter -> ???

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  timeout: 1000,
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

export const getAsyncUser = createAsyncThunk(
  "main/getAsyncUser",
  async (payload, thunkAPI) => {
    try {
      const diary = await instance.get(`api/diary`);
      const userinfo = await instance.get(`api/userinfo`);

      if (diary.status === 200 && userinfo.status === 200) {
        return { diary: diary.data.diaries, userinfo: userinfo.data.userInfo };
      } else {
        thunkAPI.rejectWithValue(400);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const putAsyncUserNickname = createAsyncThunk(
  "main/putAsyncUserNickname",
  async (payload, thunkAPI) => {
    try {
      const nickname = await instance.put(`api/userinfo`, {
        nickname: payload,
      });
      if (nickname.status === 201) {
      }
    } catch (error) {}
  }
);
export const putAsyncUserSelfIntro = createAsyncThunk(
  "main/putAsyncUserSelfIntro",
  async (payload, thunkAPI) => {
    try {
      const selfIntro = await instance.put(`api/userinfo`, {
        selfIntro: payload,
      });
    } catch (error) {}
  }
);

const initialState = {
  data: {
    diary: [],
    userinfo: {},
  },
  loading: false,
  error: true,
  isUpdateSwitch: true,
};

export const mainpageSlice = createSlice({
  name: "mainpage",
  initialState,
  reducers: {
    toggleUpdateSwitch: (state, action) => {
      state.isUpdateSwitch = !state.isUpdateSwitch;
    },
  },
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
    [putAsyncUserNickname.fulfilled]: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    [putAsyncUserNickname.fulfilled]: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    },
  },
});

export const { toggleUpdateSwitch } = mainpageSlice.actions;
export default mainpageSlice.reducer;
