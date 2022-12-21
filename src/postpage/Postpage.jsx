import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  __addDiaries,
  __getWeather,
  instance,
} from "../redux/module/diariesSlice";
import { useNavigate } from "react-router-dom";

function Postpage() {
  //캔버스

  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); //캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //캔버스의 드로잉 컨텍스트

  const [isDrawing, setIsDrawing] = useState(false);

  //ref.current.
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.66;
    canvas.height = window.innerHeight * 0.45;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색 {color}
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
        ctx.beginPath(); //경로 초기화
        ctx.moveTo(offsetX, offsetY); //출발점을 좌표로 옮기기
      } else {
        ctx.lineTo(offsetX, offsetY); //도착점을 좌표로 옮기기
        ctx.stroke(); //그림
      }
    }
  };

  //날씨
  const weather = useSelector((state) => state.diaries.diary.weather);
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

  const navigate = useNavigate();
  // const onClickHandler = () => {
  //   navigate("/mainpage");
  // };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // dataURL을 Blob으로 변환
  const dataURItoBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const dataUrl = canvasRef.current.toDataURL("image/png;base64", 0.5);

    const blob = dataURItoBlob(dataUrl);

    let formData = new FormData();
    formData.append("image", blob, "img.file");
    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append(
      "weather",
      JSON.stringify({
        city: weather.city,
        weather: weather.weather,
        icon: weather.icon,
        temp: weather.temp,
      })
    );

    const diaryData = await instance.post("api/diary", formData);
    console.log(diaryData);

    setInput({
      title: "",
      content: "",
    });
    // navigate("/mainpage");
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <StPostContainer>
          <StPostSubContainer>
            <StHeaderContainer>
              <StDate>
                {nowDate}/{dayList[now.getDay() - 1]}
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
              {/* onClick={onClickHandler} */}
              <StButton type="submit">작성완료</StButton>
              <StButton>취소</StButton>
            </StButtonContainer>
          </StPostSubContainer>
        </StPostContainer>
      </form>
    </>
  );
}

export default Postpage;

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
