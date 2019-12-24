import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import { commentsShow } from "../../Functions/Comments";

const Wrapper = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  a {
    color: inherit;
  }
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 100%;
  min-height: 600px;
  max-height: 600px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding-top: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;

const Caption = styled.div`
  margin: 10px 0px 40px 0px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  overflow: hidden;
  max-height: 180px;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

export default ({
  user: { userName, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  full = { full },
  setFull = { setFull }
}) => (
  <Wrapper>
    <Box>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              key={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
    </Box>
    <Box>
      <Meta>
        <Header>
          <Avatar size="sm" url={avatar} />
          <UserColumn>
            <Link to={`/${userName}`}>
              <FatText text={userName} />
            </Link>
            <Location>{location}</Location>
          </UserColumn>
        </Header>
        <ContentsBox>
          <Caption>
            <FatText text={userName} /> {caption}
          </Caption>
          <Buttons>
            <Button onClick={toggleLike}>
              {isLiked ? <HeartFull /> : <HeartEmpty />}
            </Button>
            <Button>
              <CommentIcon />
            </Button>
          </Buttons>
          <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
          {comments && (
            <Comments>
              {commentsShow(selfComments).map(comment => (
                <Comment key={comment.id}>
                  <FatText text={comment.user.userName} />
                  {comment.text.length > 50 && comment.text.slice(0, 49) ? (
                    <Link onClick={() => setFull(!full)}>
                      {full === false && "more..."}
                    </Link>
                  ) : (
                    <span>{comment.text}</span>
                  )}
                  <span>
                    {full === true && comment.text.slice(50, comment.length)}
                  </span>
                </Comment>
              ))}
            </Comments>
          )}
          <Timestamp>{createdAt}</Timestamp>
          <Textarea
            onKeyPress={onKeyPress}
            placeholder={"Add a comment..."}
            value={newComment.value}
            onChange={newComment.onChange}
          />
        </ContentsBox>
      </Meta>
    </Box>
  </Wrapper>
);
