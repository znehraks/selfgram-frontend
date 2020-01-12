import React from "react";
import PropTypes from "prop-types";
import LiveUserPresenter from "./LiveUserPresenter";

const LiveUserContainer = ({
  id,
  userName,
  avatar
}) => {

  return (
    <LiveUserPresenter
      id={id}
      userName={userName}
      avatar={avatar}
    />
  );
};

LiveUserContainer.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

export default LiveUserContainer;
