import styled, { keyframes } from "styled-components";
const jelly = keyframes`
  0% {
    transform: scale3d(1,1,1);
  }
  30% {
    transform: scale3d(1.25,0.75,1);
  }
  40% {
    transform: scale3d(0.75,1.25,1);
  }
  50% {
    transform: scale3d(1.15,0.85,1);
  }
  65% {
    transform: scale3d(0.95,1.05,1);
  }
  75% {
    transform: scale3d(1.05,0.95,1);
  }
  100% {
    transform: scale3d(1,1,1);
  }
`;
const FlexBox = styled.div`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
`;

const StyledMainpageNav = styled(FlexBox)`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 5vh;
  min-height: 50px;
  position: fixed;
  background: white;
  top: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.__line_c1};
  padding: 0 ${(props) => props.theme.padding.xl};
`;

const StyledNavLogo = styled.img`
  height: 5vh;
  &:hover {
  }
`;

const StyledUserProfile = styled.img`
  height: 80%;
  width: 80%;
  border: 1px solid ${(props) => props.theme.color.__line_c1};
  border-radius: 50%;
`;

const StyledMainpageBg = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-color: ${(props) => props.theme.color.__bgColor};
  padding: 0 ${(props) => props.theme.padding.xl};
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

// 프로필 컴포넌트

const StyledMainpageMyProfile = styled.div`
  width: 25%;
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 섹션 컴포넌트
const StyledMainpageSection = styled.section`
  width: 75%;
  min-width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 100px 50px;
  overflow-y: scroll;
`;

const StyledAddDiaryButton = styled.button`
  position: absolute;
  bottom: calc(50px + ${(props) => props.theme.margin.lg});
  right: ${(props) => props.theme.margin.lg};
  background: ${(props) => props.theme.color.__icon_c2};
  color: ${(props) => props.theme.color.__line_c1};
  border-radius: 15px;
  border: none;
  padding: ${(props) => props.theme.padding.base};
  cursor: pointer;
  &:hover {
    animation: ${jelly} .8s both;
  }
`;

export {
  StyledMainpageNav,
  StyledNavLogo,
  StyledMainpageBg,
  StyledUserProfile,
  StyledAddDiaryButton,

  // 프로필 컴포넌트
  StyledMainpageMyProfile,

  // 섹션 컴포넌트
  StyledMainpageSection,
  FlexBox,
};
