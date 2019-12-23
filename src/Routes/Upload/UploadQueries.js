import { gql } from "apollo-boost";

export const POST_UPLOAD = gql`
  mutation createPostItem(
    $location: String
    $caption: String
    $files: [String!]!
  ) {
    createPostItem(location: $location, caption: $caption, files: $files)
  }
`;

export const STORY_UPLOAD = gql`
  mutation createStoryItem($files: [String!]!) {
    createStoryItem(files: $files)
  }
`;
