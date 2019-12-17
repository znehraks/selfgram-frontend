import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation togglePostLike($postId: String!) {
    togglePostLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        userName
      }
    }
  }
`;
