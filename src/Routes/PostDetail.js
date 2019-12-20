import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PostPopUp from "../Components/PostPopUp";
import Loader from "../Components/Loader";

const GET_POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default withRouter(
  ({
    match: {
      params: { id }
    }
  }) => {
    const { data, loading } = useQuery(GET_POST, {
      variables: {
        postId: id
      }
    });
    console.log(data);
    return (
      <Wrapper>
        <Helmet>
          <title>Post | Selfgram</title>
        </Helmet>
        {loading && <Loader />}
        {!loading &&
          data &&
          data.seePost &&
            <PostPopUp
              key={data.seePost.id}
              id={data.seePost.id}
              location={data.seePost.location}
              caption={data.seePost.caption}
              user={data.seePost.user}
              files={data.seePost.files}
              likeCount={data.seePost.likeCount}
              isLiked={data.seePost.isLiked}
              comments={data.seePost.comments}
              createdAt={data.seePost.createdAt}
            />
          }
      </Wrapper>
    );
  }
);
