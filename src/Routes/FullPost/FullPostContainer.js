import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import FullPostPresenter from "./FullPostPresenter";

const GET_FULL_POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      user
      files
      createdAt
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { userName }
    }
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { userName } });
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
  }
);
