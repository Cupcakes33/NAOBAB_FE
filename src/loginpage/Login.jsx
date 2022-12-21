import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { signInUser } from "../redux/module/loginSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [inputSignInValue, setInputSignInValue] = useState({
    username: "",
    password: "",
  });

  //로그인inputSignInValue 스테이트 구조분해 할당(for 각 상태관리, 유효성검사)
  const { username, password } = inputSignInValue;

  //로그인input창 상태관리를 위한 초기값 세팅
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //정규식
  const regUsername = /^[A-Za-z0-9]{6,}$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputSignInValue({ ...inputSignInValue, [name]: value });

    if (name === "username") {
      if (!regUsername.test(value)) {
        setUsernameInput("영문이나 숫자로 6글자 이상이어야합니다");
        setIsUsername(false);
      } else {
        setUsernameInput("");
        setIsUsername(true);
      }
    }

    if (name === "password") {
      if (!regPassword.test(value)) {
        setPasswordInput("영문,숫자,특수문자 포함 8글자 이상이어야합니다");
        setIsPassword(false);
      } else {
        setPasswordInput("");
        setIsPassword(true);
      }
    }
  };

  const signInHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }
    const payload = {
      username,
      password,
    };
    dispatch(signInUser(payload));
    setInputSignInValue({ username: "", password: "" });
  };

  return (
    <StLoginContainer>
      <StImg />
      <StLogin>
        <h1>들어가기</h1>
        <form>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            name="username"
            value={inputSignInValue.username}
            onChange={onChangeHandler}
          ></input>
          <p>{usernameInput}</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={inputSignInValue.password}
            onChange={onChangeHandler}
          ></input>
          <p>{passwordInput}</p>
          <button
            onClick={signInHandler}
            disabled={!(isUsername && isPassword)}
          >
            로그인
          </button>
        </form>
      </StLogin>
    </StLoginContainer>
  );
};

export default Login;

const LoadEffect = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  animation: ${LoadEffect} 0.7s ease-in-out;
`;

const StImg = styled.div`
  border: 5px solid #dadde6;
  border-radius: 10px;
  background-image: url("https://post-phinf.pstatic.net/MjAyMTAxMTVfMTcz/MDAxNjEwNjk1MjAyMzk5.ZWxcQ1RJUhYvXDdDcWks1VZ8mfb0SQkG4X8v4_XShPQg.dH1mPBtYKoJxEFMkQlHmfvScRltPgKGZq-CwdsO-Pggg.JPEG/tid350t000049_l.jpg?type=w1200");
  width: 440px;
  height: 440px;
  background-size: cover;
`;

const StLogin = styled.div`
  border: 5px solid #dadde6;
  background-color: #f8f7f7;
  border-radius: 10px;
  width: 440px;
  height: 440px;
  h1 {
    margin-top: 100px;
    margin-bottom: 30px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 340px;
    margin: auto;
    input {
      border: 0;
      outline: 0;
      background: white;
      padding: 10px 5px;
      border-radius: 5px;
      padding-left: 10px;
      &::placeholder {
        color: grey;
        text-transform: capitalize;
        font-weight: bold;
      }
    }
    p {
      height: 20px;
    }
    button {
      color: white;
      border: 0;
      outline: 0;
      background: #899be6;
      padding: 10px 5px;
      border-radius: 5px;
      padding-left: 10px;
    }
    button:hover {
      transform: scale(1.02);
    }
    button:active {
      transform: scale(0.98);
    }
  }
`;
