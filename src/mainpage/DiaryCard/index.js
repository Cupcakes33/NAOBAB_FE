import {
  StyledCard,
  StyledCards,
  StyledCardHeart,
  StyledCardTextWrapper,
} from "./style";

import { BsFillHeartFill } from "react-icons/bs";

const DiaryCard = ({ diaryData }) => {
  const transrateLocaleDate = (dateString) => {
    const date = new Date(dateString.slice(0, 10));
    return date.toLocaleDateString("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
              <h1>{diary.title}</h1>
              <span>{transrateLocaleDate(`${diary.createdAt}`)}</span>
            </StyledCardTextWrapper>
          </StyledCard>
        );
      })}
    </StyledCards>
  );
};

export default DiaryCard;
