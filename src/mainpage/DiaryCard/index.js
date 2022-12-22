import {
  StyledCard,
  StyledCards,
  StyledCardHeart,
  StyledCardTextWrapper,
} from "./style";

import { useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";

const DiaryCard = ({ diaryData }) => {
  const navigate = useNavigate();
  const transrateLocaleDate = (dateString) => {
    const date = new Date(dateString.slice(0, 10));
    return date.toLocaleDateString("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const detailPageNavigateHandler = (diaryId) => {
    navigate(`/detailpage/${diaryId}`);
  };

  return (
    <StyledCards>
      {diaryData.map((diary) => {
        return (
          <StyledCard key={`diary${diary.diaryId}`}>
            <StyledCardHeart>
              <BsFillHeartFill />
            </StyledCardHeart>
            <StyledCardTextWrapper>
              <h1
                onClick={() => {
                  detailPageNavigateHandler(diary.diaryId);
                }}
              >
                {diary.title}
              </h1>
              <span>{transrateLocaleDate(`${diary.createdAt}`)}</span>
            </StyledCardTextWrapper>
          </StyledCard>
        );
      })}
    </StyledCards>
  );
};

export default DiaryCard;
