import { useEffect, useState, useRef } from "react";
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
  StyledUploadInput,
  FlexBox,
} from "./style";
import CustomButton from "../Components/Button";
import { BsFillBackspaceFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsyncUser,
  putAsyncUser,
  toggleUpdateSwitch,
} from "../../redux/module/mainpageSlice";

const UpdateUserinfo = () => {
  const dispatch = useDispatch();
  const { data, error, loading, isUpdateSwitch } = useSelector(
    (state) => state.mainpage
  );

  const userData = data?.userinfo;
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  const [profileImgStore, setProfileImgStore] = useState(userData.profileImg);

  const fileInput = useRef(null);

  const [updateStore, setUpdateStore] = useState({
    nickname: "",
    selfIntro: "",
  });

  useEffect(() => {
    dispatch(getAsyncUser());
    !loading &&
      setUpdateStore(() => {
        return {
          nickname: userData?.nickname,
          selfIntro: userData?.selfIntro,
        };
      });
  }, [dispatch]);

  const updateInputChangeHandler = (event) => {
    const { value, name } = event.target;

    setUpdateStore((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateSwitchHandler = () => {
    if (!isUpdateProfile) {
      setIsUpdateProfile(!isUpdateProfile);
    } else {
      setIsUpdateProfile(!isUpdateProfile);
    }
  };

  const selfIntroUpdateSwitchHandler = () => {
    // dataURL을 Blob으로 변환
    const dataURItoBlob = (dataURI) => {
      const splitDataURI = dataURI.split(",");
      const byteString =
        splitDataURI[0].indexOf("base64") >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
      return new Blob([ia], { type: mimeString });
    };
    const blob = dataURItoBlob(profileImgStore);
    let formData = new FormData();
    formData.append("nickname", updateStore.nickname);
    formData.append("selfIntro", updateStore.selfIntro);
    formData.append("image", blob, "img.file");

    dispatch(putAsyncUser(formData));
  };

  const profileImgChangeHandler = (e) => {
    if (e.target.files[0]) {
      setProfileImgStore(e.target.files[0]);
    } else {
      setProfileImgStore(profileImgStore);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImgStore(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(profileImgStore);
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
              {/* <img src={userData?.profileImg}></img> */}
              <img
                style={{ cursor: "pointer" }}
                src={profileImgStore}
                onClick={() => {
                  fileInput.current.click();
                }}
              ></img>
            </StyledProfileImg>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={profileImgChangeHandler}
              ref={fileInput}
            />
            {/* <StyledUploadInput>
              <label htmlFor="file">예쁜 내 얼굴 바꾸기</label>
              <input type="file" id="file" onChange={profileImgChangeHandler}/>
            </StyledUploadInput> */}
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
              </FlexBox>
              {isUpdateProfile ? (
                <StyledInfoUpdateInput
                  value={updateStore.nickname}
                  name="nickname"
                  onChange={(event) => updateInputChangeHandler(event)}
                ></StyledInfoUpdateInput>
              ) : (
                <StyledInfo>{updateStore.nickname}</StyledInfo>
              )}
            </FlexBox>
            <FlexBox direction="column">
              <FlexBox width="100%" justify="space-between" align="center">
                <h3>당신을 소개한다면 ?</h3>
              </FlexBox>

              {isUpdateProfile ? (
                <StyledInfoUpdateInput
                  value={updateStore.selfIntro}
                  name="selfIntro"
                  onChange={(event) => updateInputChangeHandler(event)}
                ></StyledInfoUpdateInput>
              ) : (
                <StyledInfo>{updateStore.selfIntro}</StyledInfo>
              )}
            </FlexBox>
            <FlexBox direction="column">
              <FlexBox
                width="100%"
                justify="flex-end"
                align="center"
                gap="20px"
              >
                <CustomButton
                  padding="8px"
                  margin="10px 0px"
                  borderRadius="10px"
                  onClick={() => {
                    updateSwitchHandler();
                  }}
                >
                  개인정보를 수정할래요
                </CustomButton>
                <CustomButton
                  padding="8px"
                  margin="10px 0px"
                  borderRadius="10px"
                  onClick={() => {
                    selfIntroUpdateSwitchHandler();
                  }}
                >
                  개인정보를 저장할래요
                </CustomButton>
              </FlexBox>
            </FlexBox>
          </StyledProfileContentsWrapper>
        </StyledSection>
      </StyledUserWrapper>
    </StyledUserinfoContainer>
  );
};

export default UpdateUserinfo;
