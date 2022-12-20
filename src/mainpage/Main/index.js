import { ThemeProvider } from "styled-components";
import defaultTheme from "../style/theme";
import {
  StyledMainpageNav,
  StyledNavLogo,
  StyledMainpageBg,
  StyledMainpageMyProfile,
  StyledMainpageSection,
  StyledAddDiaryButton,
} from "./style";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncUser } from "../../redux/module/mainpageSlice";

import DiaryCard from "../DiaryCard";
import MyProfile from "../MyProfile";
import ToggleNav from "../ToggleNav";
import UpdateUserinfo from "../UpdateUserinfo";
import CustomButton from "../Components/Button";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, loading, isUpdateSwitch } = useSelector(
    (state) => state.mainpage
  );
  // error.message === "Rejected" && navigate("/");
  
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
        {!isUpdateSwitch ? (
          <>
            <StyledMainpageMyProfile>
              <MyProfile
                userData={data?.userinfo}
                diaryLength={data?.diary.length}
              />
            </StyledMainpageMyProfile>
            <StyledMainpageSection>
              <StyledAddDiaryButton>다이어리 작성하기</StyledAddDiaryButton>

              {data?.diary.length > 0 ? (
                <DiaryCard diaryData={data?.diary} />
              ) : null}
            </StyledMainpageSection>
          </>
        ) : (
          <UpdateUserinfo userData={data?.userinfo} />
        )}
      </StyledMainpageBg>
    </ThemeProvider>
  );
};

export default Main;
