import { ThemeProvider } from "styled-components";
import defaultTheme from "../style/theme";
import { MdFace, MdLogout, MdFavorite } from "react-icons/md";
import {
  StyledMainpageNav,
  StyledNavLogo,
  StyledNavUserinfo,
  StyledMainpageBg,
  StyledUserProfile,
  StyledUserName,
  UserinfoImgWrapper,
  UserinfoToggleMenu,
  FlexBox,
  UserinfoMenuItems,
} from "../style/MainpageStyledComponents";
import { useState } from "react";

const Mainpage = ({ data, error, loading }) => {
  const [menuToggleSwitch, setmenuToggleSwitch] = useState("");
  const menuToggleSwitchHandler = () => {
    !menuToggleSwitch ? setmenuToggleSwitch("active") : setmenuToggleSwitch("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledMainpageNav justify={"space-between"}>
        <StyledNavLogo src="img/logo2.png" />
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
            <li>
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
      </StyledMainpageNav>
      <StyledMainpageBg></StyledMainpageBg>
    </ThemeProvider>
  );
};

export default Mainpage;
