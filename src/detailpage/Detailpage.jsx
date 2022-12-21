import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getDiaries } from "../redux/module/diariesSlice";
import { useParams } from "react-router-dom";

function Detailpage() {
  //useState
  const dispatch = useDispatch();
  const { diary } = useSelector((state) => state.diaries.diary);
  // console.log(JSON.parse(diary.weather.city));
  const { diaryId } = useParams();
  useEffect(() => {
    dispatch(__getDiaries(diaryId));
  }, [dispatch, diaryId]);

  const transrateLocaleDate = (dateString) => {
    const date = new Date(dateString.slice(0, 10));
    return date.toLocaleDateString("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const weatherAPI = JSON.parse(diary.weather);
  console.log(weatherAPI.city);

  return (
    <>
      <form>
        <StPostContainer>
          <StPostSubContainer>
            <StHeaderContainer>
              <StDate>{transrateLocaleDate(`${diary.createdAt}`)}</StDate>
              <StWeather>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherAPI.icon}@2x.png`}
                />
                <div>{weatherAPI.weather}</div>
                <div>{weatherAPI.city}</div>
                <div>{Math.round(weatherAPI.temp - 273.15)}℃</div>
              </StWeather>
            </StHeaderContainer>

            <StTittleContainer>
              <div>제목:</div>

              <StTittle>{diary.title}</StTittle>
            </StTittleContainer>
            <StCanvas>
              {/* <img src={`${JSON.parse(diary.image)}`} /> */}
              <img src={diary.image} />
            </StCanvas>
            <StContentContainer>{diary.content}</StContentContainer>
            <StButtonContainer>
              <StButton>수정</StButton>
              <StButton>취소</StButton>
            </StButtonContainer>
          </StPostSubContainer>
        </StPostContainer>
        ;
      </form>
    </>
  );
}

export default Detailpage;

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

const StTittle = styled.div`
  width: 100%;
  height: 90%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: 10px;
`;
const StCanvas = styled.div`
  width: 1050;
  height: 600;
`;
const StContentContainer = styled.div`
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
