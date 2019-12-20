import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [loginMutation] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: userName.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "" && password !== "") {
        try {
          const {
            data: { login: token }
          } = await loginMutation();
          if (Number(token) === 0) {
            console.log(token);
            toast.error("Wrong Password!");
          } else if (Number(token) === -1) {
            console.log(token);
            toast.error("You don't have an account, create one!");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("Login Success");
            try {
              await localLogInMutation({ variables: { token } });
              window.location ="/";
            } catch (e) {
              console.log(e);
              toast.error("Unexpected Error Sorry..");
            }
            setTimeout(() => null, 2000);
          }
        } catch (e) {
          console.log(e.message);
        }
      } else {
        toast.error("Email/Password is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        userName.value !== "" &&
        password.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          console.log(createAccount);
          if (!createAccount) {
            toast.error("Can't create Account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field is required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      onSubmit={onSubmit}
    />
  );
};
