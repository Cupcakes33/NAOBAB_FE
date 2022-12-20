import React from "react";
import Main from "./mainpage/Main";
import Postpage from "./postpage/Postpage";
import Detailpage from "./detailpage/Detailpage";
import LoginPage from "./loginpage/LoginPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/mainpage" element={<Main />} />
      <Route path="/postpage" element={<Postpage />} />
      <Route path="/detailpage/:diaryId" element={<Detailpage />} />
      {/* 수정버튼을 누르면  */}
    </Routes>
  );
};

export default App;
