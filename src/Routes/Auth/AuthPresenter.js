import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  setAction,
  action,
  userName,
  password,
  firstName,
  lastName,
  email,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"Email"} {...email} type="email" />
          <Input placeholder={"Password"} {...password} type="password" />
          <Button text={"Log in"} />
        </form>
      )}
      {action === "signUp" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"Email"} {...email} />
          <Input placeholder={"Password"} {...password} type="password" />
          <Input placeholder={"First Name"} {...firstName} />
          <Input placeholder={"Last Name"} {...lastName} />
          <Input placeholder={"Username"} {...userName} />
          <Button text={"Sign Up"} />
        </form>
      )}
    </Form>
    <StateChanger>
      {action === "logIn" ? (
        <>
          Don't have an account?{" "}
          <Link onClick={() => setAction("signUp")}>Sign Up</Link>
        </>
      ) : (
        <>
          Have an account?{" "}
          <Link onClick={() => setAction("logIn")}>Log in</Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
);
