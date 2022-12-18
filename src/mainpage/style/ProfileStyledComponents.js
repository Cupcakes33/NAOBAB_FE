import styled, { keyframes } from "styled-components";

const StyledProfileImgWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: white;
  left: 50%;
  transform: translateX(-50%);
  top: -50px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 0.5s;
  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledProfileContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
`;

const StyledProfileContent = styled.div`
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(120px);

  h2 {
    font-size: ${(props) => props.theme.font.lg};
    color: ${(props) => props.theme.color.__line_c1};
    line-height: 20px;
    /* self-intro 최대 글자 제한 35 */
    span {
      font-size: ${(props) => props.theme.font.base};
      color: ${(props) => props.theme.color.__icon_c1};
      opacity: 0.7;
    }
  }
`;

const StyledProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  h3 {
    font-size: ${(props) => props.theme.font.sm};
    color: ${(props) => props.theme.color.__icon_c2};
    span {
      font-size: ${(props) => props.theme.font.base};
      color: ${(props) => props.theme.color.__line_c1};
    }
  }
`;
const StyledProfileCard = styled.div`
  width: 350px;
  height: 190px;
  background: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);
  transition: 0.5s;

  &:hover {
    height: 450px;
  }
  &:hover ${StyledProfileImgWrapper} {
    width: 250px;
    height: 250px;
  }

  &:hover ${StyledProfileContent} {
    transform: translateY(0);
  }
`;

export {
  StyledProfileCard,
  StyledProfileImgWrapper,
  StyledProfileContentWrapper,
  StyledProfileContent,
  StyledProfileDetail,
};
