import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  position: relative;
  bottom: -10;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
  z-index: -100;
  @media (max-height: 700px) {
    visibility: hidden;
  }
  @media (max-height: 410px) {
    visibility: hidden;
  }
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  margin-top: 40px;
  margin-right: 16px;
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const CopyRight = styled.span`
  margin-top: 40px;
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">about us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">support</Link>
      </ListItem>
      <ListItem>
        <Link href="#">press</Link>
      </ListItem>
      <ListItem>
        <Link href="#">api</Link>
      </ListItem>
      <ListItem>
        <Link href="#">jobs</Link>
      </ListItem>
      <ListItem>
        <Link href="#">privacy</Link>
      </ListItem>
      <ListItem>
        <Link href="#">terms</Link>
      </ListItem>
      <ListItem>
        <Link href="#">directory</Link>
      </ListItem>
      <ListItem>
        <Link href="#">profiles</Link>
      </ListItem>
      <ListItem>
        <Link href="#">hashtags</Link>
      </ListItem>
      <ListItem>
        <Link href="#">language</Link>
      </ListItem>
    </List>
    <CopyRight>Selfgram {new Date().getFullYear()} &copy;</CopyRight>
  </Footer>
);
