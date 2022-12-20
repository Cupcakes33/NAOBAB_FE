import React from "react";
import Main from "./mainpage/Main";
import Postpage from "./postpage/Postpage";
import LoginPage from "./loginpage/LoginPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./loginpage/PrivateRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/mainpage" element={<Main />} />
        <Route path="/postpage" element={<Postpage />} />
        <Route path="/detailpage/:postId" element={<Postpage />} />
      </Route>
    </Routes>
  );
};

export default App;


const ProtectedRouter = () => {}
// 어드민 / 유저 구분해서 라우팅을 할 수 있음
