import React from "react";
import FatText from "../Components/FatText";
import {Comment} from "../Components/PostPopUp/PostPopUpPresenter";

export const autoLine = (comment, text, length) => {
  if (length > 50) {
    for (let i = 0; i < length; i + 50) {
      let slicedText = text.slice(i, i + 50);
      return (
        <Comment key={comment.id}>
          <FatText text={comment.user.userName} />
          {slicedText}
        </Comment>
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
  if (comments.length >= 5) {
    comments = comments.slice(comments.length - 5);
    return comments;
  } else {
    return comments;
  }
};
