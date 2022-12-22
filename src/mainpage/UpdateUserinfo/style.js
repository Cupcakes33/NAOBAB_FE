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

const StyledUserinfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUserWrapper = styled.div`
  width: 70%;
  min-width: 950px;
  height: 60%;
  min-height: 550px;
  position: relative;
  border: 3px solid ${(props) => props.theme.color.__icon_c2};
  border-radius: 20px;
  overflow: hidden;
`;

const StyledUserinfoHeader = styled.div`
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.color.__icon_c2};
  color: ${(props) => props.theme.color.__line_c1};
  font-size: ${(props) => props.theme.font.xl};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${(props) => props.theme.padding.xl};
`;
const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    transition: 0.3s;
  }
  &:hover svg {
    transform: scale(1.1) rotate(15deg);
  }
`;

const StyledSection = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
`;

const StyledProfileImgWrapper = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0px;
`;

const StyledProfileImg = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.5s;
  border: 3px solid ${(props) => props.theme.color.__icon_c2};

  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledProfileContentsWrapper = styled.div`
  width: 70%;
  height: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    margin-bottom: 10px;
  }
`;

const StyledInfo = styled.div`
  width: 100%;
  height: 50px;
  border: 2px dotted ${(props) => props.theme.color.__icon_c2};
  border-radius: 15px;
  padding: ${(props) => props.theme.padding.sm};
`;

const StyledInfoUpdateInput = styled.input`
  width: 100%;
  height: 50px;
  border: 2px dotted ${(props) => props.theme.color.__icon_c2};
  border-radius: 15px;
  padding: ${(props) => props.theme.padding.sm};
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height};
  gap: ${(props) => props.gap};
`;

const StyledUploadInput = styled.div`
  label {
    display: inline-block;
    font: ${(props) => props.theme.font.base};
    background: ${(props) => props.theme.color.__icon_c2};
    color: ${(props) => props.theme.color.__line_c1};
    border-radius: 10px;
    border: none;
    padding: 8px;
    margin: 10px 0px;
    cursor: pointer;
    &:hover {
      animation: ${jelly} 0.8s both;
    }
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
export {
  StyledUserinfoContainer,
  StyledUserWrapper,
  StyledUserinfoHeader,
  StyledIcon,
  StyledProfileImgWrapper,
  StyledProfileImg,
  StyledProfileContentsWrapper,
  StyledSection,
  StyledInfo,
  StyledInfoUpdateInput,
  StyledUploadInput,
  FlexBox,
};
