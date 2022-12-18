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
  // 프로필 컴포넌트 시작
  StyledMainpageMyProfile,

  // 섹션 컴포넌트 시작
  StyledMainpageSection,
} from "../style/MainpageStyledComponents";
import { useState } from "react";
import Profile from "../components/Profile";
import DiaryCard from "../DiaryCard";

const Mainpage = ({ data, error, loading }) => {
  const [menuToggleSwitch, setmenuToggleSwitch] = useState("");
  const menuToggleSwitchHandler = () => {
    !menuToggleSwitch ? setmenuToggleSwitch("active") : setmenuToggleSwitch("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* nav bar */}
      <StyledMainpageNav justify={"space-between"}>
        <StyledNavLogo src="img/big-logo.png" />
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

      {/* navbar end */}

      <StyledMainpageBg>
        {/* User My Profile */}
        <StyledMainpageMyProfile>
          <Profile userData={data?.userinfo} />
        </StyledMainpageMyProfile>
        {/* User My Profile end */}
        <StyledMainpageSection>
          <DiaryCard />
        </StyledMainpageSection>
      </StyledMainpageBg>
    </ThemeProvider>
  );
};

export default Mainpage;
