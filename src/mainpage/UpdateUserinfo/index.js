import { useEffect, useState } from "react";
import {
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
  FlexBox,
} from "./style";
import CustomButton from "../Components/Button";
import { BsFillBackspaceFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  toggleUpdateSwitch,
  putAsyncUserNickname,
  putAsyncUserSelfIntro,
} from "../../redux/module/mainpageSlice";

const UpdateUserinfo = ({ userData }) => {
  const dispatch = useDispatch();
  const [isUpdateProfile, setIsUpdateProfile] = useState({
    nickname: false,
    selfIntro: false,
  });

  const [updateStore, setUpdateStore] = useState({
    nickname: "",
    selfIntro: "",
  });

  useEffect(() => {
    setUpdateStore({
      nickname: userData.nickname,
      selfIntro: userData.selfIntro,
    });
  }, []);

  const nicknameChangeHandler = (event) => {
    setUpdateStore((prev) => {
      return { ...prev, nickname: event.target.value };
    });
  };
  const selfIntroChangeHandler = (event) => {
    setUpdateStore((prev) => {
      return { ...prev, selfIntro: event.target.value };
    });
  };

  const swapSwtich = (item) => {
    setIsUpdateProfile((prev) => {
      return { ...prev, [item]: !prev[item] };
    });
  };

  const nicknameUpdateSwitchHandler = () => {
    if (!isUpdateProfile.nickname) {
      swapSwtich("nickname");
    } else {
      dispatch(putAsyncUserNickname(updateStore.nickname));
      swapSwtich("nickname");
    }
  };
  const selfIntroUpdateSwitchHandler = () => {
    if (!isUpdateProfile.selfIntro) {
      swapSwtich("selfIntro");
    } else {
      dispatch(putAsyncUserSelfIntro(updateStore.selfIntro));
      swapSwtich("selfIntro");
    }
  };
  return (
    <StyledUserinfoContainer>
      <StyledUserWrapper>
        {/* header parts */}
        <StyledUserinfoHeader>
          <p>{userData?.nickname} 님의 개인정보에요</p>
          <StyledIcon
            onClick={() => {
              dispatch(toggleUpdateSwitch());
            }}
          >
            <BsFillBackspaceFill />
          </StyledIcon>
        </StyledUserinfoHeader>
        {/* profileimg parts */}
        <StyledSection>
          <StyledProfileImgWrapper>
            <StyledProfileImg>
              <img src={userData?.profileImg}></img>
            </StyledProfileImg>
            <CustomButton
              padding="8px"
              margin="10px 0px"
              borderRadius="10px"
              onClick={() => {
                console.log(1);
              }}
            >
              사진을 변경할래요
            </CustomButton>
          </StyledProfileImgWrapper>
          {/* detail contents parts */}
          <StyledProfileContentsWrapper>
            <FlexBox direction="column">
              <h3>당신의 이름은</h3>
              <StyledInfo>{userData?.username}</StyledInfo>
            </FlexBox>
            <FlexBox direction="column">
              <FlexBox width="100%" justify="space-between" align="center">
                <h3>당신의 닉네임은</h3>
                <CustomButton
                  padding="8px"
                  margin="10px 0px"
                  borderRadius="10px"
                  onClick={() => {
                    nicknameUpdateSwitchHandler();
                  }}
                >
                  닉네임을 변경할래요
                </CustomButton>
              </FlexBox>
              {isUpdateProfile.nickname ? (
                <StyledInfoUpdateInput
                  value={updateStore.nickname}
                  onChange={(event) => nicknameChangeHandler(event)}
                ></StyledInfoUpdateInput>
              ) : (
                <StyledInfo>{userData?.nickname}</StyledInfo>
              )}
            </FlexBox>
            <FlexBox direction="column">
              <FlexBox width="100%" justify="space-between" align="center">
                <h3>당신을 소개한다면 ?</h3>
                <CustomButton
                  padding="8px"
                  margin="10px 0px"
                  borderRadius="10px"
                  onClick={() => {
                    selfIntroUpdateSwitchHandler();
                  }}
                >
                  자기소개를 변경할래요
                </CustomButton>
              </FlexBox>

              {isUpdateProfile.selfIntro ? (
                <StyledInfoUpdateInput
                  value={updateStore.selfIntro}
                  onChange={(event) => selfIntroChangeHandler(event)}
                ></StyledInfoUpdateInput>
              ) : (
                <StyledInfo>{userData?.selfIntro}</StyledInfo>
              )}
            </FlexBox>
          </StyledProfileContentsWrapper>
        </StyledSection>
      </StyledUserWrapper>
    </StyledUserinfoContainer>
  );
};

export default UpdateUserinfo;
