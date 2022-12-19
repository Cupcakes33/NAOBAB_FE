import {
  StyledCard,
  StyledCards,
  StyledCardHeart,
  StyledCardTextWrapper,
} from "./style";

import { BsFillHeartFill } from "react-icons/bs";

const DiaryCard = ({ diaryData }) => {
  console.log(diaryData);
  return (
    <StyledCards>
      <StyledCard>
        <StyledCardHeart>
          <BsFillHeartFill />
        </StyledCardHeart>
        <StyledCardTextWrapper>
          <h1>{diaryData[0].title}</h1>
          <span>2022년 12월 12일</span>
        </StyledCardTextWrapper>
      </StyledCard>
    </StyledCards>
  );
};

export default DiaryCard;
