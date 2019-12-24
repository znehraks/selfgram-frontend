import React from "react";
import FatText from "../Components/FatText";
import { Comment } from "../Components/PostPopUp/PostPopUpPresenter";
import { Link } from "../Routes/Profile/ProfilePresenter";

export const autoLine = (comment, text, length, full, setFull) => {
  if (length > 50) {
    for (let i = 0; i < length; i + 50) {
      let slicedText = text.slice(i, i + 50);
      return (
        <>
          {slicedText}{" "}
          <Link onClick={() => setFull(!full)}>
            {full === false && "more..."}
          </Link>
          <span>{full === true && text}</span>
        </>
      );
    }
  } else {
    return (
      <Comment key={comment.id}>
        <FatText text={comment.user.userName} />
        {text}
      </Comment>
    );
  }
};

export const commentsShow = comments => {
  if (comments.length > 5) {
    comments = comments.slice(comments.length - 5, comments.length);
    return comments;
  } else {
    return comments;
  }
};
