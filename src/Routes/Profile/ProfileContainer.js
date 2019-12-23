import React, { useState } from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePresenter from "./ProfilePresenter";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser(
    $userName: String
    $password: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      userName: $userName
      password: $password
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      userName
      email
      password
      firstName
      lastName
      bio
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteAccount($userName: String!, $password: String!) {
    deleteAccount(userName: $userName, password: $password)
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
    const [action, setAction] = useState(true);
    const [mode, setMode] = useState("menu");
    const { data, loading } = useQuery(GET_USER, {
      variables: { userName }
    });
    const email = useInput("");
    const password = useInput("");
    const passwordConfirm = useInput("");
    const deleteConfirm = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");
    const [editUserMutation] = useMutation(EDIT_USER, {
      variables: {
        userName: userName,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        bio: bio.value
      }
    });
    const [deleteUserMutation] = useMutation(DELETE_USER, {
      variables: {
        userName: userName,
        password: password.value
      }
    });
    const [logOut] = useMutation(LOG_OUT);

    const onSubmit = async e => {
      e.preventDefault();
      if (action === false && mode === "edit") {
        if (password.value === passwordConfirm.value) {
          try {
            const data = await editUserMutation();
            if (data) {
              toast.success("Success");
              setTimeout(() => window.location.reload(), 1000);
            }
          } catch (e) {
            console.log(e);
            toast.error("Can't Edit Profile");
          }
        } else {
          toast.error("password and confirm aren't same");
        }
      } else if (action === false && mode === "delete") {
        if (
          deleteConfirm.value === `Really Delete ${userName}` &&
          password.value === passwordConfirm.value
        ) {
          try {
            const data = await deleteUserMutation();
            if (data) {
              toast.success("Account Deleted Successfully!");
              setTimeout(()=>logOut(),2000);
            }
          } catch (e) {
            console.log(e);
            toast.error("Can't Delete Account");
          }
        } else {
          toast.error("please confirm again!");
        }
      }
    };

    return (
      <ProfilePresenter
        setAction={setAction}
        action={action}
        setMode={setMode}
        mode={mode}
        userName={userName}
        email={email}
        firstName={firstName}
        lastName={lastName}
        password={password}
        passwordConfirm={passwordConfirm}
        deleteConfirm={deleteConfirm}
        bioI={bio}
        onSubmit={onSubmit}
        loading={loading}
        logOut={logOut}
        data={data}
      />
    );
  }
);
