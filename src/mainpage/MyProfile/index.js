import {
  StyledProfileCard,
  StyledProfileImgWrapper,
  StyledProfileContentWrapper,
  StyledProfileContent,
  StyledProfileDetail,
} from "./style";
import { MdPostAdd } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmarkHeartFill } from "react-icons/bs";

const Profile = ({ userData, diaryLength }) => {
  return (
    <StyledProfileCard>
      <StyledProfileImgWrapper>
        <img src={userData?.profileImg}></img>
      </StyledProfileImgWrapper>
      <StyledProfileContentWrapper>
        <StyledProfileContent>
          <h2>
            {userData?.nickname}
            <br />
            <span>{userData?.selfIntro}</span>
          </h2>
          <StyledProfileDetail>
            <h3>
              <MdPostAdd />
              <br />
              <span>{diaryLength}</span>
            </h3>
            <h3>
              <FaUserFriends />
              <br />
              <span>0</span>
            </h3>
            <h3>
              <BsBookmarkHeartFill />
              <br />
              <span>0</span>
            </h3>
          </StyledProfileDetail>
        </StyledProfileContent>
      </StyledProfileContentWrapper>
    </StyledProfileCard>
  );
};

export default Profile;
