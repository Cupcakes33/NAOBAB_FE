import styled from "styled-components";

const StyledCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;
const StyledCard = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledCardHeart = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: ${(props) => props.theme.color.__icon_c2};
  top: -17px;
  left: -17px;
  color: white;
  cursor: pointer;
  svg {
    transition: all 0.3s;
  }
  &:hover svg {
    transform: scale(1.2);
  }
`;

const StyledCardTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: ${(props) => props.theme.color.__icon_c2};
  }
  span {
    color: ${(props) => props.theme.color.__line_c1};
  }
`;

export { StyledCard, StyledCards, StyledCardHeart, StyledCardTextWrapper };
