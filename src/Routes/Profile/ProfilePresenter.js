import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Settings, Back } from "../../Components/Icons";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UserNameRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 30px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const EditLink = styled(Link)``;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius: 0px;
  width: 100%;
  max-width: 400px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const LinkBack = styled(Link)`
  margin-left: 170px;
`;

const Span = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
`;

const SettingList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${props => props.theme.boxBorder};
`;

const SettingListItem = styled.li`
  font-size: 20px;
  padding: 10px 0px;
`;

export default ({
  setAction,
  action,
  setMode,
  mode,
  email,
  firstName,
  lastName,
  password,
  passwordConfirm,
  deleteConfirm,
  onSubmit,
  loading,
  bioI,
  logOut,
  data
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (loading === false) {
    if (!loading && data && data.seeUser) {
      const {
        seeUser: {
          id,
          avatar,
          userName,
          fullName,
          isFollowing,
          isSelf,
          bio,
          followingCount,
          followersCount,
          postsCount,
          posts
        }
      } = data;
      return (
        <Wrapper>
          <>
            <Helmet>
              <title>{userName} | Selfgram</title>
            </Helmet>
            <Header>
              <HeaderColumn>
                <Avatar size="lg" url={avatar} />
              </HeaderColumn>
              <HeaderColumn>
                <UserNameRow>
                  <UserName>{userName}</UserName>{" "}
                  {!isSelf && (
                    <FollowButton isFollowing={isFollowing} id={id} />
                  )}
                  {isSelf && (
                    <EditLink
                      onClick={() => {
                        setAction(!action);
                      }}
                    >
                      {action === true ? (
                        <Settings />
                      ) : (
                        <Back style={{ marginLeft: "5px" }} />
                      )}
                    </EditLink>
                  )}
                </UserNameRow>
                <Counts>
                  <Count>
                    <FatText text={String(postsCount)} /> posts
                  </Count>
                  <Count>
                    <FatText text={String(followersCount)} /> followers
                  </Count>
                  <Count>
                    <FatText text={String(followingCount)} /> following
                  </Count>
                </Counts>
                <FullName text={fullName} />
                <Bio>{bio}</Bio>
              </HeaderColumn>
            </Header>
            {action === true && (
              <Posts>
                {posts &&
                  posts.map(post => (
                    <SquarePost
                      key={post.id}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      file={post.files[0]}
                    />
                  ))}
              </Posts>
            )}
            {action === false && mode === "menu" && (
              <>
                <Span>Settings</Span>
                <Box>
                  <SettingList>
                    <SettingListItem>
                      <Link onClick={() => setMode("edit")}>Edit Profile</Link>
                    </SettingListItem>
                  </SettingList>
                  <SettingList>
                    <SettingListItem>
                      <Link onClick={() => setMode("delete")}>
                        Delete Profile
                      </Link>
                    </SettingListItem>
                  </SettingList>
                </Box>
              </>
            )}
            {action === false && mode === "edit" && (
              <Form>
                <Helmet>
                  <title>Edit | Selfgram</title>
                </Helmet>
                <Span>Edit Your Profile</Span>
                <LinkBack onClick={() => setMode("menu")}>back</LinkBack>
                <form style={{ marginTop: "20px" }} onSubmit={onSubmit}>
                  <Input placeholder={"userName"} value={userName} onChange={()=>null} readonly />
                  <Input
                    placeholder={"Password"}
                    {...password}
                    type="password"
                  />
                  <Input
                    placeholder={"password Confirm"}
                    {...passwordConfirm}
                    type="password"
                  />
                  <Input placeholder={"First Name"} {...firstName} />
                  <Input placeholder={"Last Name"} {...lastName} />
                  <Input placeholder={"Bio"} {...bioI} />
                  <Button text={"Apply"} />
                </form>
              </Form>
            )}
            {action === false && mode === "delete" && (
              <Form>
                <Helmet>
                  <title>Delete | Selfgram</title>
                </Helmet>
                <Span>Really Delete..?</Span>
                <LinkBack onClick={() => setMode("menu")}>back</LinkBack>
                <form style={{ marginTop: "20px" }} onSubmit={onSubmit}>
                  <Input
                    placeholder={`write down "Really Delete ${userName}"`}
                    {...deleteConfirm}
                  />
                  <Input
                    placeholder={"Password"}
                    {...password}
                    type="password"
                  />
                  <Input
                    placeholder={"password Confirm"}
                    {...passwordConfirm}
                    type="password"
                  />
                  <Button text={"Delete"} />
                </form>
              </Form>
            )}
          </>
        </Wrapper>
      );
    }
  }
  return null;
};
