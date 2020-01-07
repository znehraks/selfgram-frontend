import React from "react";
import styled, { keyframes } from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Login } from "../Icons";

const Animation = keyframes`
    0% {
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;
const ListContainer = styled.div`
  ${props => props.theme.whiteBox};
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: ${props => props.theme.boxBorder};
  }
  width: 100%;
  padding: 6px 15px;
  svg {
    fill: #00a93f;
  }
`;

const List = styled.div`
  width: 50%;
  :first-child {
    width: 20%;
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
  :last-child {
    width: 20%;
  }
`;

const Icon = styled.div`
  animation: ${Animation} 2.5s linear infinite;
`;

export default ({ id, userName, avatar }) => (
  <ListContainer>
    <List>
      <Avatar size="sm" url={avatar} />
    </List>
    <List>
      <FatText text={userName} />
    </List>
    <Icon>
      <Login size={12} />
    </Icon>
  </ListContainer>
);
