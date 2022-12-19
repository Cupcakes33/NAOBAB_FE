import styled from "styled-components";

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
  padding: 100px 0px;
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

export {
  StyledMainpageNav,
  StyledNavLogo,
  StyledMainpageBg,
  StyledUserProfile,

  // 프로필 컴포넌트
  StyledMainpageMyProfile,

  // 섹션 컴포넌트
  StyledMainpageSection,
  FlexBox,
};
