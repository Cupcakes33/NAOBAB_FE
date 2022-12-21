import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { signUpUser } from "../redux/module/loginSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  //회원가입inputSignUpValue 스테이트 생성
  const [inputSignUpValue, setInputSignUpValue] = useState({
    username: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  //회원가입inputSignUpValue 스테이트 구조분해 할당(for 각 상태관리, 유효성검사)
  const { username, nickname, password, passwordConfirm } = inputSignUpValue;

  //회원가입input창 상태관리 위해 초기값 세팅
  const [usernameInput, setUsernameInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  //정규식
  const regUsername = /^[A-Za-z0-9]{6,}$/;
  const regNickname = /^[A-Za-z가-힣]{2,}$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputSignUpValue({ ...inputSignUpValue, [name]: value });

    if (name === "username") {
      if (!regUsername.test(value)) {
        setUsernameInput("영문이나 숫자로 6글자 이상이어야합니다");
        setIsUsername(false);
      } else {
        setUsernameInput("");
        setIsUsername(true);
      }
    }

    if (name === "nickname") {
      if (!regNickname.test(value)) {
        setNicknameInput("영문이나 한글로 2글자 이상이어야합니다");
        setIsNickname(false);
      } else {
        setNicknameInput("");
        setIsNickname(true);
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

    if (name === "passwordConfirm") {
      if (password !== value) {
        setPasswordConfirmInput("비밀번호 확인이 일치하지 않습니다");
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmInput("");
        setIsPasswordConfirm(true);
      }
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      nickname.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === ""
    ) {
      return alert(
        "회원가입에 필요한 정보를 입력해주세요! *는 필수 항목입니다"
      );
    }
    const payload = {
      username,
      nickname,
      password,
    };
    dispatch(signUpUser(payload));
    setInputSignUpValue({
      username: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <StSignUpContainer>
      <StSignUp>
        <h1>가입하기</h1>
        <form>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            name="username"
            value={inputSignUpValue.username}
            onChange={onChangeHandler}
          ></input>
          <p>{usernameInput}</p>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={inputSignUpValue.nickname}
            onChange={onChangeHandler}
          ></input>
          <p>{nicknameInput}</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={inputSignUpValue.password}
            onChange={onChangeHandler}
          ></input>
          <p>{passwordInput}</p>
          <input
            type="password"
            placeholder="비밀번호를 확인해주세요"
            name="passwordConfirm"
            value={inputSignUpValue.passwordConfirm}
            onChange={onChangeHandler}
          ></input>
          <p>{passwordConfirmInput}</p>
          <button
            onClick={signUpHandler}
            disabled={
              !(isUsername && isNickname && isPassword && isPasswordConfirm)
            }
          >
            회원가입
          </button>
        </form>
      </StSignUp>
      <StImg />
    </StSignUpContainer>
  );
};

export default SignUp;

const LoadEffect = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const StSignUpContainer = styled.div`
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

const StSignUp = styled.div`
  border: 5px solid #dadde6;
  background-color: #f8f7f7;
  border-radius: 10px;
  width: 440px;
  height: 440px;
  h1 {
    margin-top: 50px;
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
