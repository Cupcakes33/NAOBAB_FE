import React, { useState } from "react";
import styled from "styled-components";

import SignUp from "./SignUp";
import Login from "./Login";

const LoginPage = () => {
  const [viewSignUp, setViewSignUp] = useState(true);

  return (
    <StLoginPage>
      <StImg alt="NAOBAB background-img" src="img/logo2.png" />
      <StButtonContainer>
        <StSignUpButton onClick={() => setViewSignUp(true)}>
          회원가입하기
        </StSignUpButton>
        <StLoginButton onClick={() => setViewSignUp(false)}>
          로그인하기
        </StLoginButton>
      </StButtonContainer>
      <div>{viewSignUp ? <SignUp /> : <Login />}</div>
    </StLoginPage>
  );
};

export default LoginPage;

const StLoginPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StImg = styled.img`
  width: 750px;
  margin-bottom: 30px;
`;

const StButtonContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StLoginButton = styled.button`
  background: #899be6;
  color: white;
  width: 120px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
  border: transparent;
  &:hover {
    transform: scale(1.03);
    font-size: 17px;
  }
  &:active {
    transform: scale(0.97);
    font-size: 15px;
  }
`;

const StSignUpButton = styled.button`
  background: #899be6;
  color: white;
  width: 120px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
  border: transparent;
  &:hover {
    transform: scale(1.03);
    font-size: 17px;
  }
  &:active {
    transform: scale(0.97);
    font-size: 15px;
  }
`;
