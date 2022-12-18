import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
`;

const StyledNavUserinfo = styled(FlexBox)`
  width: 100px;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  transition: height 0.5s, width 0.5s;

  &.active {
    width: 200px;
    height: 400px;
    border-radius: 15px;
    background: white;
    transition: width 0.5s, height 0.5s;
    transition-delay: 0s, 0.75s;
  }
`;

const UserinfoImgWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const StyledUserProfile = styled.img`
  height: 80%;
  width: 80%;
  border: 1px solid ${(props) => props.theme.color.__line_c1};
  border-radius: 50%;
`;

const UserinfoToggleMenu = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: ${(props) => props.theme.color.__line_c1};
    transform: translateY(-10px);
    box-shadow: 0 10px ${(props) => props.theme.color.__line_c1};
    transition: 0.5s;
  }
  &.active::before {
    transform: translateY(0px) rotate(45deg);
    box-shadow: 0 0 ${(props) => props.theme.color.__line_c1};
  }
  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: ${(props) => props.theme.color.__line_c1};
    transform: translateY(10px);
    transition: 0.5s;
  }
  &.active::after {
    transform: translateY(0px) rotate(-45deg);
    box-shadow: 0 0 ${(props) => props.theme.color.__line_c1};
  }
`;

const StyledUserName = styled.span`
  width: 100%;
  color: ${(props) => props.theme.color.__line_c1};
  font-size: ${(props) => props.theme.font.sm};
  margin-left: ${(props) => props.theme.margin.base};
`;

const UserinfoMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  visibility: hidden;

  &.active {
    visibility: visible;
    transition: 0.5s;
    transition-delay: 0.75s;
  }
  svg {
    font-size: ${(props) => props.theme.font.xl};
  }
  span {
    font-size: ${(props) => props.theme.font.sm};
  }
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    list-style: none;
    color: ${(props) => props.theme.color.__line_c1};
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.color.__icon_c1};
    }
  }
`;

export {
  StyledNavUserinfo,
  UserinfoImgWrapper,
  StyledUserProfile,
  UserinfoToggleMenu,
  StyledUserName,
  UserinfoMenuItems,
  FlexBox,
};
