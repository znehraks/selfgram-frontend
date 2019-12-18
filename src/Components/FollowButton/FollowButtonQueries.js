import { gql } from "apollo-boost";

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($followId: String!) {
    toggleFollow(followId: $followId)
  }
`;
