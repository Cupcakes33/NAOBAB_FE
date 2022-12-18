import { ThemeProvider } from "styled-components";
import defaultTheme from "../style/theme";

import {
  StyledMainpageNav,
  StyledNavLogo,
  StyledMainpageBg,
  StyledMainpageMyProfile,
  StyledMainpageSection,
} from "./style";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncUser } from "../../redux/module/mainpageSlice";

import DiaryCard from "../DiaryCard";
import MyProfile from "../MyProfile";
import ToggleNav from "../ToggleNav";

const Main = () => {
  const dispatch = useDispatch();

  const { data, error, loading } = useSelector((state) => state.mainpage);

  useEffect(() => {
    dispatch(getAsyncUser(1));
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* nav bar */}
      <StyledMainpageNav justify={"space-between"}>
        <StyledNavLogo src="img/big-logo.png" />
        <ToggleNav data={data} />
      </StyledMainpageNav>

      {/* navbar end */}

      <StyledMainpageBg>
        {/* User My Profile */}
        <StyledMainpageMyProfile>
          <MyProfile userData={data?.userinfo} />
        </StyledMainpageMyProfile>
        {/* User My Profile end */}
        <StyledMainpageSection>
          <DiaryCard />
        </StyledMainpageSection>
      </StyledMainpageBg>
    </ThemeProvider>
  );
};

export default Main;
