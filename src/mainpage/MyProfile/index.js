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

const Profile = ({ userData }) => {
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
            <span>{userData?.self_intro}</span>
          </h2>
          <StyledProfileDetail>
            <h3>
              <MdPostAdd />
              <br />
              <span>342</span>
            </h3>
            <h3>
              <FaUserFriends />
              <br />
              <span>342</span>
            </h3>
            <h3>
              <BsBookmarkHeartFill />
              <br />
              <span>32</span>
            </h3>
          </StyledProfileDetail>
        </StyledProfileContent>
      </StyledProfileContentWrapper>
    </StyledProfileCard>
  );
};

export default Profile;
