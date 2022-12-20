import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getDiarys } from "../redux/module/diarysSlice";

function Editpage() {
  //useState
  const dispatch = useDispatch();
  const { diarys } = useSelector((state) => state.diarys);
  console.log(diarys);
  useEffect(() => {
    dispatch(__getDiarys());
  }, []);
  // const [input, setInput] = useState({
  //   title: "",
  //   content: "",
  // });

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setInput({ ...input, [name]: value });
  // };

  // const editSubmit = () => {
  //   e.preventDefault();
  //   const image = canvasRef.current.toDataURL();
  //   dispatch(
  //     __addDiarys({
  //       id: `diarys_${new Date().getTime() + Math.random()}`,
  //       title: input.title,
  //       content: input.content,
  //       image: image,
  //       weather: {
  //         city: weather.city,
  //         weather: weather.weather,
  //         icon: weather.icon,
  //         temp: weather.temp,
  //       },
  //     })
  //   );
  //   setInput({
  //     title: "",
  //     content: "",
  //   });
  //   // navigate("/")
  // };

  return (
    <>
      {/* onSubmit={onSubmitHandler} */}
      <form>
        <StPostContainer>
          <StPostSubContainer>
            <StHeaderContainer>
              {diarys.map((diary) => {})}
              <StDate>
                {/* {nowDate}
                {dayList[now.getDay() - 1]} */}
              </StDate>
              <StWeather>
                {/* <img
                  src={`http://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                />
                <div>{weather?.weather}</div>
                <div>{weather?.city}</div>
                <div>{Math.round(weather?.temp - 273.15)}℃</div> */}
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
                // value={input.title}
                // onChange={onChangeHandler}
              ></StInput>
            </StTittleContainer>

            <canvas
            // ref={canvasRef}
            // onMouseDown={startDrawing}
            // onMouseUp={finishDrawing}
            // onMouseMove={drawing}
            // onMouseLeave={finishDrawing}
            ></canvas>

            <StTextAreaContainer
              placeholder="일기를 써볼까?"
              name="content"
              // value={input.content}
              // onChange={onChangeHandler}
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

export default Editpage;

const StPostContainer = styled.div`
  max-width: 1000px;
  min-width: 800px;
  height: 100vh;
  margin: 0 auto;
  background-color: #eee;
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
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
