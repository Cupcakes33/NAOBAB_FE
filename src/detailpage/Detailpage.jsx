import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  __getDiaries,
  __putDiaries,
  __deleteDiaries,
} from "../redux/module/diariesSlice";
import { useNavigate, useParams } from "react-router-dom";

function Detailpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { diaryId } = useParams();
  
  const getDiary = useSelector((state) => state.diaries.diary);

  const transrateLocaleDate = (dateString) => {
    const date = new Date(dateString.slice(0, 10));
    return date.toLocaleDateString("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //el.id랑 비교해서 일치하는것 구분해서 input창으로 바꾸기 ==> 수정 버튼 클릭시 edtiOn 에 아이디들어옴
  const [editOn, setEditOn] = useState(false);
  // 수정완료시 input창에 작성한 값 받아오기
  const [input, setInput] = useState("");

  const onEditChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onDeleteDiary = () => {
    dispatch(__deleteDiaries(diaryId));
  };

  //수정완료버튼
  const onEditComplete = () => {
    dispatch(
      __putDiaries({
        title: input.title,
        content: input.content,
        diaryId: diaryId,
      })
    );
    // 빈값으로 변경해줘야 일치하는 아이디 없이 input창으로 보여주는거 없애기
    setEditOn(false);
  };

  useEffect(() => {
    dispatch(__getDiaries(diaryId));
  }, [editOn]);

  const onClickMainHandler = () => {
    navigate("/mainpage");
  };

  return (
    <>
      <div>
        <StPostContainer>
          {editOn ? (
            <StPostSubContainer>
              <StHeaderContainer>
                <StDate>
                  {transrateLocaleDate(`${getDiary?.diary?.createdAt}`)}
                </StDate>
                <StWeather>
                  <img
                    src={`http://openweathermap.org/img/wn/${getDiary?.weatherAPI?.icon}@2x.png`}
                  />
                  <div>{getDiary?.weatherAPI?.weather}</div>
                  <div>{getDiary?.weatherAPI?.city}</div>
                  <div>{Math.round(getDiary?.weatherAPI.temp - 273.15)}℃</div>
                </StWeather>
              </StHeaderContainer>

              <StTittleContainer>
                <div>제목:</div>

                <StTittle>
                  <StEditInput
                    type="text"
                    name="title"
                    placeholder="수정해보자"
                    value={input.title || ""}
                    onChange={onEditChangeHandler}
                  ></StEditInput>
                </StTittle>
              </StTittleContainer>
              <StCanvas>
                <img src={getDiary?.diary?.image} />
              </StCanvas>
              <StContentContainer>
                <StEditTextArea
                  name="content"
                  placeholder="수정해보자"
                  value={input.content || ""}
                  onChange={onEditChangeHandler}
                ></StEditTextArea>
              </StContentContainer>
              <StButtonContainer>
                <StButton onClick={onEditComplete}>수정완료</StButton>
                <StButton onClick={() => setEditOn("")}>취소</StButton>
                <StButton onClick={onClickMainHandler}>메인으로</StButton>
              </StButtonContainer>
            </StPostSubContainer>
          ) : (
            <StPostSubContainer>
              <StHeaderContainer>
                <StDate>
                  {transrateLocaleDate(`${getDiary?.diary?.createdAt}`)}
                </StDate>
                <StWeather>
                  <img
                    src={`http://openweathermap.org/img/wn/${getDiary?.weatherAPI?.icon}@2x.png`}
                  />
                  <div>{getDiary?.weatherAPI?.weather}</div>
                  <div>{getDiary?.weatherAPI?.city}</div>
                  <div>{Math.round(getDiary?.weatherAPI?.temp - 273.15)}℃</div>
                </StWeather>
              </StHeaderContainer>

              <StTittleContainer>
                <div>제목:</div>

                <StTittle>{getDiary?.diary?.title}</StTittle>
              </StTittleContainer>
              <StCanvas>
                <img src={getDiary?.diary?.image} />
              </StCanvas>
              <StContentContainer>
                {getDiary?.diary?.content}
              </StContentContainer>
              <StButtonContainer>
                <StButton
                  onClick={() => {
                    setEditOn(true);
                  }}
                >
                  수정
                </StButton>
                <StButton onClick={onDeleteDiary}>삭제</StButton>
                <StButton onClick={onClickMainHandler}>메인으로</StButton>
              </StButtonContainer>
            </StPostSubContainer>
          )}
        </StPostContainer>
      </div>
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
  width: 73%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
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

const StEditInput = styled.input`
  width: 100%;
  height: 100%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.5rem;
`;
const StEditTextArea = styled.textarea`
  border: none;
  resize: none;
  width: 100%;
  height: 100%;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.8rem;
`;
