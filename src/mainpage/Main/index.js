import { ThemeProvider } from "styled-components";
import defaultTheme from "../style/theme";

import {
  StyledMainpageNav,
  StyledNavLogo,
  StyledMainpageBg,
  StyledMainpageMyProfile,
  StyledMainpageSection,
} from "./style";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncUser } from "../../redux/module/mainpageSlice";

import DiaryCard from "../DiaryCard";
import MyProfile from "../MyProfile";
import ToggleNav from "../ToggleNav";

const Main = () => {
  const dispatch = useDispatch();
  const { data, error, loading, isSwitch } = useSelector(
    (state) => state.mainpage
  );
  
  useEffect(() => {
    dispatch(getAsyncUser());
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
        {!isSwitch ? (
          <>
            <StyledMainpageMyProfile>
              <MyProfile
                userData={data?.userinfo}
                diaryLength={data?.diary.length}
              />
            </StyledMainpageMyProfile>
            <StyledMainpageSection>
              {data?.diary.length > 0 ? (
                <DiaryCard diaryData={data?.diary} />
              ) : null}
            </StyledMainpageSection>
          </>
        ) : (
          <div>수정페이지 입니다</div>
        )}
      </StyledMainpageBg>
    </ThemeProvider>
  );
};

export default Main;
