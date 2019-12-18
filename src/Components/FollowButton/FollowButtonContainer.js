import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_FOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [toggleFollowMutation] = useMutation(TOGGLE_FOLLOW, {
    variables: { followId: id }
  });

  const onClick = () => {
    let result;
    if (isFollowingS === true) {
      result = toggleFollowMutation();
      if (result) {
        setIsFollowing(false);
      } else {
        toast.error("Can't perform unfollow");
      }
    } else {
      result = toggleFollowMutation();
      if (result) {
        setIsFollowing(true);
      } else {
        toast.error("Can't perform follow");
      }
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
