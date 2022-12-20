import styled, { keyframes } from "styled-components";

const CustomButton = ({ children, ...rest }) => {
  return <CustomJellyButton {...rest}>{children}</CustomJellyButton>;
};

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

const CustomJellyButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  background: ${(props) => props.background || props.theme.color.__icon_c2};
  color: ${(props) => props.color || props.theme.color.__line_c1};
  border-radius: ${(props) => props.borderRadius || "15px"};
  border: none;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || props.theme.padding.base};
  cursor: pointer;
  &:hover {
    animation: ${jelly} 0.8s both;
  }
`;

export default CustomButton;
