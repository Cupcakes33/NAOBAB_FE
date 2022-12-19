import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __addDiarys, __getWeather } from "./redux/module/diarysSlice";

function App() {
  //캔버스
  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); //캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //캔버스의 드로잉 컨텍스트
  const [isDrawing, setIsDrawing] = useState(false);
  //ref.current.
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.4;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 2.5; // 선의 굵기
    contextRef.current = context;
    setCtx(context);

    dispatch(__getWeather());
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
  const weather = useSelector((state) => state.diarys.diary.weather);
  //날짜
  const dayList = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const now = new Date();
  const nowDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

  //useState
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(weather);
    dispatch(
      __addDiarys({
        id: `diarys_${new Date().getTime() + Math.random()}`,
        title: input.title,
        content: input.content,
        image: "",
        weather: {
          city: weather.city,
          weather: weather.weather,
          icon: weather.icon,
          temp: weather.temp,
        },
      })
    );
    setInput({
      title: "",
      content: "",
    });
    // navigate("/")
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <StPostContainer>
          <StPostSubContainer>
            <StHeaderContainer>
              <StDate>
                {nowDate}
                {dayList[now.getDay() - 1]}
              </StDate>
              <StWeather>
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                />
                <div>{weather?.weather}</div>
                <div>{weather?.city}</div>
                <div>{Math.round(weather?.temp - 273.15)}℃</div>
              </StWeather>
            </StHeaderContainer>
            <StTittleContainer>
              <div>
                <label>제목:</label>
              </div>

              <StInput
                placeholder="제목을 입력해볼까?"
                type="text"
                name="title"
                value={input.title}
                onChange={onChangeHandler}
              ></StInput>
            </StTittleContainer>

            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={drawing}
              onMouseLeave={finishDrawing}
            ></canvas>

            <StTextAreaContainer
              placeholder="일기를 써볼까?"
              name="content"
              value={input.content}
              onChange={onChangeHandler}
            ></StTextAreaContainer>
            <StButtonContainer>
              <StButton type="submit">작성완료</StButton>
              <StButton>취소</StButton>
            </StButtonContainer>
          </StPostSubContainer>
        </StPostContainer>
      </form>
    </>
  );
}

export default App;

const StPostContainer = styled.div`
  max-width: 1000px;
  min-width: 800px;
  height: 100vh;
  margin: 0 auto;
  background-color: #eee;
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
  width: 80%;
  height: 13%;
  font-weight: 500;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StDate = styled.div`
  width: 50%;
  height: 40%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StWeather = styled.div`
  width: 50%;
  height: 40%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StTittleContainer = styled.div`
  width: 70%;
  height: 5%;
`;

const StInput = styled.input`
  width: 100%;
  height: 90%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: 10px;
`;

const StTextAreaContainer = styled.textarea`
  width: 70%;
  height: 25%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.8rem;
`;

const StButtonContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StButton = styled.button`
  width: 30%;
  height: 40px;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.3rem;
  cursor: pointer;
`;
