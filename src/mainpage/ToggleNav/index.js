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
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { toggleUpdateSwitch } from "../../redux/module/mainpageSlice";

const ToggleNav = ({ data }) => {
  const dispatch = useDispatch();
  const [menuToggleSwitch, setmenuToggleSwitch] = useState("");

  const menuToggleSwitchHandler = () => {
    !menuToggleSwitch ? setmenuToggleSwitch("active") : setmenuToggleSwitch("");
  };
  return (
    <>
      <Modal></Modal>
      <StyledNavUserinfo className={menuToggleSwitch}>
        <UserinfoImgWrapper>
          <FlexBox justify={"flex-start"}>
            <StyledUserProfile src={data?.userinfo?.profileImg} />
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
            <span>My Profile</span>
          </li>
          <li>
            <MdFavorite />
            <span>My Favorite</span>
          </li>
          <li>
            <MdLogout />
            <span>Logout</span>
          </li>
        </UserinfoMenuItems>
      </StyledNavUserinfo>
    </>
  );
};

export default ToggleNav;
