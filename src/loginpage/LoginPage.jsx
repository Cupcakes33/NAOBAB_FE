import React from "react";
import styled from "styled-components";

import SignUp from "./SignUp";
import Login from "./Login";

const LoginPage = () => {
  return (
    <StLoginPage>
      <SignUp />
      <Login />
    </StLoginPage>
  );
};

export default LoginPage;

const StLoginPage = styled.div`
  height: 440px;
  overflow: hidden;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
