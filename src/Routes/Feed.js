import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import LiveUser from "../Components/LiveUser";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        userName
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
      }
      createdAt
    }
  }
`;

const USER_QUERY = gql`
  {
    seeLoginUser {
      id
      userName
      avatar
      updatedAt
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 80vh;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 66%;
  min-height: 80vh;
  @media (min-width: 1000px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  height: 100%;
  min-width: 200px;
  margin-left: 150px;
  @media (max-width: 1000px) {
    width: 0;
    visibility: hidden;
    margin: 0;
    padding: 0;
    display: none;
  }
`;

const UserWrapperHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
  border: ${props => props.theme.boxBorder};
  border-bottom: none;
  background-color: white;
`;

const Span = styled.span`
  color: ${props => props.theme.blackColor};
  font-size: 16px;
  font-weight: 600;
`;

export default () => {
  const feedQuery = useQuery(FEED_QUERY);
  const postData = feedQuery.data;
  const postLoading = feedQuery.loading;
  console.log(postData);

  const userQuery = useQuery(USER_QUERY);
  const userData = userQuery.data;
  const userLoading = userQuery.loading;
  console.log(userData);

  return (
    <>
      {(postLoading || userLoading) && <Loader />}
      <Wrapper>
        <PostWrapper>
          <Helmet>
            <title>Feed | Selfgram</title>
          </Helmet>
          {!postLoading &&
            postData &&
            postData.seeFeed &&
            postData.seeFeed.map(post => (
              <Post
                key={post.id}
                id={post.id}
                location={post.location}
                caption={post.caption}
                user={post.user}
                files={post.files}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                comments={post.comments}
                createdAt={post.createdAt}
              />
            ))}
        </PostWrapper>
        <UserWrapper>
          {!userLoading && (
            <UserWrapperHeader>
              <Span>NowLogin</Span>
            </UserWrapperHeader>
          )}
          {!userLoading &&
            userData &&
            userData.seeLoginUser &&
            userData.seeLoginUser.map(user => (
              <LiveUser
                key={user.id}
                id={user.id}
                userName={user.userName}
                avatar={user.avatar}
              />
            ))}
        </UserWrapper>
      </Wrapper>
    </>
  );
};
