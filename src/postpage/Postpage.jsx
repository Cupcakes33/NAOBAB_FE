import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

function Postpage() {
  //컨버스
  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); //캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //캔버스의 드로잉 컨텍스트
  const [isDrawing, setIsDrawing] = useState(false);
  //ref.current.
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.5;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 2.5; // 선의 굵기
    contextRef.current = context;
    setCtx(context);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    //canvas.getContext('2d')의 값이 있을때
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  //날씨
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState(0);

  const apiCall = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${e24f562135ff4b7941d7c0737f4fe4d1}`
    )
    .then((res) => {
      console.log(res);
      setCity(res.data.name);
      setWeather(res.data.weather[0].main);
      setIcon(res.data.weather[0].icon);
      setTemp(res.data.main.feels_like);
    });

  return (
    <>
      <StPostContainer>
        <StPostSubContainer>
          <StHeaderContainer>
            <StDate>2022년 12월 17일</StDate>
            <StWeather></StWeather>
          </StHeaderContainer>

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={drawing}
            onMouseLeave={finishDrawing}
          ></canvas>

          <StTextAreaContainer name="content">
            나는 밥을 먹었다.
          </StTextAreaContainer>
        </StPostSubContainer>
      </StPostContainer>

      {/* <img src="img/naobabLogo.png" style={{ width: "200px" }}></img>
      <img src="img/favicon.ico" style={{ width: "32px" }}></img>
      <img src="img/weather.png" style={{ width: "100px" }}></img> */}
    </>
  );
}

export default Postpage;

const StPostContainer = styled.div`
  max-width: 1000px;
  min-width: 800px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const StPostSubContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StHeaderContainer = styled.div`
  width: 70%;
  height: 20%;
  font-weight: 500;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StDate = styled.div`
  border: 2px solid #41403e;
  width: 50%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StWeather = styled.div`
  border: solid 2px #41403e;

  width: 50%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StTextAreaContainer = styled.textarea`
  border: solid 2px #41403e;
  width: 70%;
  height: 30%;
  font-weight: 500;
  font-size: 1.5rem;
`;
