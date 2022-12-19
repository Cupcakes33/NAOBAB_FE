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
  display: flex;
  justify-content: flex-start;
  gap: 30px;
`;
