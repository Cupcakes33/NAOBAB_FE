import { useState } from "react";
import {
  StyledNavUserinfo,
  StyledUserProfile,
  StyledUserName,
  UserinfoImgWrapper,
  UserinfoToggleMenu,
  FlexBox,
  UserinfoMenuItems,
} from "./style";
import { MdFace, MdLogout, MdFavorite } from "react-icons/md";

import { useDispatch } from "react-redux";
import { toggleUpdateSwitch } from "../../redux/module/mainpageSlice";
import { useNavigate } from "react-router-dom";

const ToggleNav = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuToggleSwitch, setmenuToggleSwitch] = useState("");

  const menuToggleSwitchHandler = () => {
    !menuToggleSwitch ? setmenuToggleSwitch("active") : setmenuToggleSwitch("");
  };

  const LogoutButtonHandler = () => {
    alert("로그아웃 되셨습니다!");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <StyledNavUserinfo className={menuToggleSwitch}>
        <UserinfoImgWrapper>
          <FlexBox>
            <FlexBox justify={"flex-start"} width="50px">
              <StyledUserProfile src={data?.userinfo?.profileImg} />
            </FlexBox>
            {menuToggleSwitch === "active" ? (
              <StyledUserName>{data?.userinfo?.nickname}</StyledUserName>
            ) : null}
          </FlexBox>
        </UserinfoImgWrapper>
        <UserinfoToggleMenu
          className={menuToggleSwitch}
          onClick={menuToggleSwitchHandler}
        ></UserinfoToggleMenu>

        <UserinfoMenuItems className={menuToggleSwitch}>
          <li
            onClick={() => {
              dispatch(toggleUpdateSwitch());
            }}
          >
            <MdFace />
            <span>내 정보 보기</span>
          </li>
          <li>
            <MdFavorite />
            <span>내가 좋아하는거</span>
          </li>
          <li>
            <MdLogout />
            <span onClick={LogoutButtonHandler}>일기 안쓰기</span>
          </li>
        </UserinfoMenuItems>
      </StyledNavUserinfo>
    </>
  );
};

export default ToggleNav;
